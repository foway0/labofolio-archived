import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  // Will get here
  if (err.status && err.status === 404) {
    console.log(`what??? (╯°□°）╯︵ ┻━┻`);
    res.status(404).send('what??? (╯°□°）╯︵ ┻━┻');
  } else {
    res.status(500).end();
  }
};
