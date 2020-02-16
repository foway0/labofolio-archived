import { RequestHandler } from 'express';

import Context from '../../../context';
import { SequelizeHelper, wrap } from '../../../helper';

export const ping: RequestHandler = wrap(
  async (req, res, next): Promise<void> => {
    await SequelizeHelper.authenticate(Context.getMysql());
    res.status(200).send('pong');
  }
);
