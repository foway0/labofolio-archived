import { RequestHandler } from 'express';

export const ping: RequestHandler = (req, res, next): void => {
  res.status(200).send('pong');
};
