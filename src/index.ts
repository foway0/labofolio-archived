import Service from './app/api/app';

(async (): Promise<void> => {
  const env = {};

  const app = new Service('localhost', 3000);
  await app.init();
  app.start(env);
})();
