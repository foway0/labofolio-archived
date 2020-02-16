import env from './shared/environment';
import config from './shared/config';
import Context from './context';

(async (): Promise<void> => {
  await Context.initStore(config.mysql);
  Context.initModels();
  await Context.syncModels();

  let service;
  switch (env.SERVICE_MODE) {
    case 'api':
      service = require('./app/api/app').ApiApplication;
      break;
    case 'admin':
      service = require('./app/admin/app').AdminApplication;
      break;
    default:
      throw Error('server mode ERROR!');
  }
  const app = new service(env.SERVICE_HOST, env.SERVICE_PORT);
  await app.init();
  app.start(env);
})().catch(err => {
  console.log(err);
  process.exit(1);
});
