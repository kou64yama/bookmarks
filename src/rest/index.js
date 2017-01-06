import { Router } from 'express';
import PrettyError from 'pretty-error';
import createError from 'http-errors';
import { bookmarkService } from '../services';

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

export default function rest() {
  const router = Router();
  router.use(bookmarkService.router());

  // eslint-disable-next-line no-unused-vars
  router.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(pe.render(err));

    switch (err.name) {
      case 'SequelizeValidationError':
        return next(createError(400, err.message, { ...err }));
      case 'SequelizeUniqueConstraintError':
        return next(createError(409, err.message, { ...err }));
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
