import { Router } from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import path from 'path';

import Application from '../application';
import { ping } from './routes/ping';
import { errorHandler } from '../middleware/error_handler';

class ApiApplication extends Application {
  constructor(host: string, port: number) {
    super(host, port);
  }

  async init(): Promise<void> {
    await new OpenApiValidator({
      apiSpec: path.join(__dirname, '../api_specs/api.yaml'),
      validateResponses: true
    }).install(this.app);

    // middleware
    this.app.use((req, res, next) => {
      console.log(`${this.host}:${this.port}${req.url}`);
      next();
    });

    // api
    const pingRouter = Router();
    pingRouter.route('/ping').get(ping);
    this.app.use('/', pingRouter);

    // error handler
    this.app.use(errorHandler);
  }
}

export default ApiApplication;
