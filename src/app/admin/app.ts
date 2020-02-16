const debug = process.env.DEBUG
  ? require('debug')('labofolio:web-app')
  : () => {};

import { OpenApiValidator } from 'express-openapi-validator';
import * as path from 'path';

import Application from '../../application';
import { errorHandler } from '../../middleware/error_handler';

class AdminApplication extends Application {
  async init(): Promise<void> {
    // middleware
    this.app.use((req, res, next) => {
      debug(`${this.host}:${this.port}${req.url}`);
      next();
    });

    await new OpenApiValidator({
      apiSpec: path.join(__dirname, '../../api_specs/admin.yaml'),
      validateRequests: true,
      validateResponses: true,
      operationHandlers: path.join(__dirname)
    }).install(this.app);

    // error handler
    this.app.use(errorHandler);
  }
}

export { AdminApplication };
