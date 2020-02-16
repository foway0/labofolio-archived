import { RequestHandler } from 'express';
import { wrap } from '../../../helper';

export const login: RequestHandler = wrap(
  async (req, res): Promise<void> => {
    res.status(200).send('login');
  }
);

export const callback: RequestHandler = wrap(
  async (req, res): Promise<void> => {
    res.status(200).send('callback');
  }
);
