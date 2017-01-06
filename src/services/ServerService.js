import _ from 'lodash';
import { Router } from 'express';
import createError from 'http-errors';
import sequelize from '../data/sequelize';

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

    router.get(this.baseUrl, wrap(200, req => this.findAll(req.params)));
    router.post(this.baseUrl, wrap(201, req => this.create(extractBody(req))));
    router.get(`${this.baseUrl}/:id`, wrap(200, req => this.findOne(req.params.id)));
    router.put(`${this.baseUrl}/:id`, wrap(200, req => this.update(req.params.id, extractBody(req))));
    router.delete(`${this.baseUrl}/:id`, wrap(200, req => this.delete(req.params.id)));

    return router;
  }

  findAll(where = {}) {
    return this.Model.findAll({ where });
  }

  create(body) {
    return this.Model.create(body);
  }

  async findOne(id) {
    const current = await this.Model.findById(id);
    if (current === null) {
      throw createError(404, `${this.Model.name} not found`);
    }
    return current;
  }

  async update(id, body) {
    return sequelize.transaction(async () => {
      const current = await this.findOne(id);
      Object.assign(current, body);
      return current.save();
    });
  }

  async delete(id) {
    const current = await this.Model.findById(id);
    if (current !== null) {
      current.destroy();
    }
  }
}
