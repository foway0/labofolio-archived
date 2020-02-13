import * as Debug from 'debug';
const debug = Debug('labofolio:app');

import { OpenApiValidator } from 'express-openapi-validator';
import * as path from 'path';

import Application from '../application';
import { errorHandler } from '../middleware/error_handler';

class ApiApplication extends Application {
  constructor(host: string, port: number) {
    super(host, port);
  }

  async init(): Promise<void> {
    await new OpenApiValidator({
      apiSpec: path.join(__dirname, '../api_specs/api.yaml'),
      validateResponses: true,
      operationHandlers: path.join(__dirname),
    }).install(this.app);

    // middleware
    this.app.use((req, res, next) => {
      debug(`${this.host}:${this.port}${req.url}`);
      next();
    });

    // error handler
    this.app.use(errorHandler);
  }
}

export default ApiApplication;
