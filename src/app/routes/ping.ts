import { Middleware } from '../../types/custom_functions';

export const ping: Middleware = (req, res, next) => {
  res.status(200).send('pong');
};
