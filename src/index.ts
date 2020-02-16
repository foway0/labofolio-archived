import env from './shared/environment';
import config from './shared/config';
import ApiApplication from './app/api/app';
import Context from './context';

(async (): Promise<void> => {
  await Context.initStore(config.mysql);
  Context.initModels();
  await Context.syncModels();

  const app = new ApiApplication(env.SERVICE_HOST, env.SERVICE_PORT);
  await app.init();
  app.start(env);
})();
