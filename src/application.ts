const debug = process.env.DEBUG
  ? require('debug')('labofolio:application')
  : () => {};

import * as express from 'express';
import * as http from 'http';
import * as https from 'https';

abstract class Application {
  protected readonly host: string;
  protected readonly port: number;
  readonly app: express.Application;
  private _server: https.Server | http.Server | undefined;

  protected constructor(host: string, port: number) {
    this.host = host;
    this.port = port;

    this.app = express();
  }

  start(env: any): void {
    if (env.SSL_CERT && env.SSL_KEY) {
      const options = {
        key: env.SSL_KEY,
        cert: env.SSL_CERT
      };

      this._server = https.createServer(options, this.app);
    } else {
      this._server = http.createServer(this.app);
    }
    this._server.listen(this.port, this.host, () => {
      debug(`${this.host}:${this.port} in on!`);
    });
  }

  abstract async init(): Promise<void>;
}

export default Application;
