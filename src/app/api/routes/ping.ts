import { RequestHandler } from 'express';

import Context from '../../../context';

export const ping: RequestHandler = async (req, res, next): Promise<void> => {
  await Context.getMysql()?.authenticate();
  res.status(200).send('pong');
};
