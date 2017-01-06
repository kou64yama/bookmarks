import _ from 'lodash';
import { Router } from 'express';
import createError from 'http-errors';
import sequelize from '../data/sequelize';
import { Securable } from '../data/models';

const wrap = (status, fn) => async (req, res, next) => {
  try {
    const result = await fn(req);
    res.status(status);
    res.jsonp(result);
  } catch (err) {
    next(err);
  }
};

const extractBody = req => _.omit(req.body, 'id', 'createdAt', 'updatedAt');

export default class ClientService {
  constructor(baseUrl, Model) {
    // remove last slashes.
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.Model = Model;
  }

  router() {
    const router = Router();

    router.get(this.baseUrl, wrap(200, req => this.findAll(req.params, req.user)));
    router.post(this.baseUrl, wrap(201, req => this.create(extractBody(req), req.user)));
    router.get(`${this.baseUrl}/:id`, wrap(200, req => this.findOne(req.params.id, req.user)));
    router.put(`${this.baseUrl}/:id`, wrap(200, req => this.update(req.params.id, extractBody(req), req.user)));
    router.delete(`${this.baseUrl}/:id`, wrap(200, req => this.delete(req.params.id, req.user)));

    return router;
  }

  isSecurable() {
    return !!this.Model.attributes.sid;
  }

  async findAll(where = {}, user) {
    const results = await this.Model.findAll({
      where: {
        ...where,
        ...this.isSecurable() ? { '$securable.ownerId$': user.id } : {},
      },
      include: [
        ...this.isSecurable() ? [{ model: Securable, as: 'securable' }] : {},
      ],
    });

    return results.map(x => x.toJSON());
  }

  create(body, user) {
    return sequelize.transaction(async (transaction) => {
      let securable;
      if (this.isSecurable()) {
        securable = await Securable.create({ ownerId: user.id }, { transaction });
      }

      const result = await this.Model.create({
        ...body,
        sid: securable && securable.id,
      }, { transaction });

      return result.toJSON();
    });
  }

  async findOne(id, user) {
    const current = await this.Model.findById(id, {
      where: {
        ...this.isSecurable() ? { '$securable.ownerId$': user.id } : {},
      },
      include: [
        ...this.isSecurable() ? [{ model: Securable, as: 'securable' }] : {},
      ],
    });
    if (current === null) {
      throw createError(404, `${this.Model.name} not found`);
    }
    return current.toJSON();
  }

  async update(id, body, user) {
    return sequelize.transaction(async (transaction) => {
      const current = await this.Model.findById(id, {
        where: {
          ...this.isSecurable() ? { '$securable.ownerId$': user.id } : {},
        },
        include: [
          ...this.isSecurable() ? [{ model: Securable, as: 'securable' }] : {},
        ],
      });
      if (current === null) {
        throw createError(404, `${this.Model.name} not found`);
      }

      Object.assign(current, body);
      await current.save({ transaction });

      return current.toJSON();
    });
  }

  async delete(id, user) {
    return sequelize.transaction(async (transaction) => {
      const current = await this.Model.findById(id, {
        where: {
          ...this.isSecurable() ? { '$securable.ownerId$': user.id } : {},
        },
        include: [
          ...this.isSecurable() ? [{ model: Securable, as: 'securable' }] : {},
        ],
        transaction,
      });
      if (current !== null) {
        current.destroy({ transaction });
      }
    });
  }
}
