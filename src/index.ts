import env from './shared/environment';
import config from './shared/config';
import ApiApplication from './app/app';
import Context from './context';

(async (): Promise<void> => {
  const ctx = new Context();
  await ctx.initStore(config.mysql);

  const app = new ApiApplication(env.SERVICE_HOST, env.SERVICE_PORT);
  await app.init();
  app.start(env);
})();
