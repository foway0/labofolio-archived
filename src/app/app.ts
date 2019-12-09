import express from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import path from 'path';

import Application from '../application';

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
    this.app.get('/ping', (req, res) => {
      res.status(200).send('pong');
    });

    // error handler
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        // Will get here
        if (err.status && err.status === 404) {
          console.log(`what??? (╯°□°）╯︵ ┻━┻`);
          res.status(404).send('what??? (╯°□°）╯︵ ┻━┻');
        } else {
          res.status(500).end();
        }
      }
    );
  }
}

export default ApiApplication;
