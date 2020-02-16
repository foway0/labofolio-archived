import { RequestHandler } from 'express';
import ono from '@jsdevtools/ono';

import Context from '../../../context';
import { SequelizeHelper, wrap } from '../../../helper';
import { Users } from '../../../models/mysql/users';

export const create: RequestHandler = wrap(
  async (req, res, next): Promise<void> => {
    const options = {
      strategy_id: req.body.strategy_id,
      status: req.body.status,
      role_id: req.body.role_id,
      nickname: req.body.nickname
    };

    const result = await SequelizeHelper.create(Context._db.users, options);

    res.status(200).json(result);
  }
);

export const one: RequestHandler = wrap(
  async (req, res): Promise<void> => {
    const options = {
      where: {
        status: Users.getStatus().valid,
        strategy_id: req.params.strategy_id
      }
    };

    const result = await SequelizeHelper.findOne(Context._db.users, options);
    if (!result)
      throw ono({ code: 'NOT_FOUND', status: 404 }, `Resource not found`);

    res.status(200).json(result);
  }
);
