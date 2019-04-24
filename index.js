(async () => {
  const core = require('./core');
  const context = core.context;
  const environment = context.getEnv();

  await context.initStores();

  let server;
  if (environment.SERVICE_MODE === 'web-api') {
    server = require('./mode/api')(environment);
    server.start(environment);
  }
})().catch(err => {
  console.log(err);
  process.exit(1);
});