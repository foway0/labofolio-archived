const debug = process.env.DEBUG ? require('debug')('labofolio:app') : () => {};

import * as express from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import * as path from 'path';

import Application from '../../application';
import { errorHandler } from '../../middleware/error_handler';

class ApiApplication extends Application {
  constructor(host: string, port: number) {
    super(host, port);
  }

  async init(): Promise<void> {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    // middleware
    this.app.use((req, res, next) => {
      debug(`${this.host}:${this.port}${req.url}`);
      next();
    });

    await new OpenApiValidator({
      apiSpec: path.join(__dirname, '../../api_specs/api.yaml'),
      validateRequests: true,
      validateResponses: true,
      operationHandlers: path.join(__dirname)
    }).install(this.app);

    // error handler
    this.app.use(errorHandler);
  }
}

export default ApiApplication;
