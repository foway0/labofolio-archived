import express from 'express';
import http from 'http';
import https from 'https';

class Application {
  protected readonly host: string;
  protected readonly port: number;
  protected readonly app: express.Express;
  private server: https.Server | http.Server | undefined;

  constructor(host: string, port: number) {
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

      this.server = https.createServer(options, this.app);
    } else {
      this.server = http.createServer(this.app);
    }
    this.server.listen(this.port, this.host, () => {
      console.log(`${this.host}:${this.port} in on!`);
    });
  }
}

export default Application;
