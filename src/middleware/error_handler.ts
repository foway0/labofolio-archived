const debug = process.env.DEBUG
  ? require('debug')('labofolio:error_handler')
  : () => {};

import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  debug('---------');
  debug(err);
  debug('---------');
  // Will get here
  if (err.status && err.status === 404) {
    res.status(404).send('what??? (╯°□°）╯︵ ┻━┻');
  } else if (err.status) {
    // format errors
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors
    });
  } else {
    res.status(503).end();
  }
};
