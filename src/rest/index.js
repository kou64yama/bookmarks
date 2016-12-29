import { Router } from 'express';
import PrettyError from 'pretty-error';
import createError from 'http-errors';
import { Bookmark } from '../data/models';

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

function restify(Model) {
  const router = Router();

  router.get('/', async (req, res, next) => {
    try {
      const result = await Model.findAll();
      res.status(200);
      res.jsonp(result);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const body = { ...req.body };
      const result = await Model.create(body);
      res.status(201);
      res.jsonp(result);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const result = await Model.findById(req.params.id);
      res.status(200);
      res.jsonp(result);
    } catch (err) {
      next(err);
    }
  });

  // eslint-disable-next-line no-unused-vars
  router.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(pe.render(err));

    switch (err.name) {
      case 'SequelizeValidationError':
        return next(createError(400, err.message, { ...err }));
      default:
        return next(err);
    }
  });

  // eslint-disable-next-line no-unused-vars
  router.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.jsonp({
      ...err,
      name: err.name,
      message: err.message,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  });

  return router;
}

export default function rest() {
  const router = Router();
  router.use('/bookmarks', restify(Bookmark));
  return router;
}
