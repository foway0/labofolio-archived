import { RequestHandler } from 'express';

import Context from '../../../context';
import { SequelizeHelper, wrap } from '../../../helper';
import { Blogs } from '../../../models/mysql/blogs';

export const create: RequestHandler = wrap(
  async (req, res, next): Promise<void> => {
    const options = {
      status: req.body.status,
      subject: req.body.subject,
      content_text: req.body.content_text,
      content_md: req.body.content_md,
      content_html: req.body.content_html
    };
    await SequelizeHelper.create(Context._db.blogs, options);
    res.status(204).send();
  }
);

export const list: RequestHandler = wrap(
  async (req, res): Promise<void> => {
    const options = {
      where: {
        status: Blogs.getStatus().valid
      },
      limit: req.query.limit,
      offset: req.query.offset
    };
    const result = await SequelizeHelper.findAndCountAll(
      Context._db.blogs,
      options
    );
    res.status(200).json(result);
  }
);
