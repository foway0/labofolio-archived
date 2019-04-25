(async () => {
  const core = require('./core');
  const context = core.context;
  const environment = context.getEnv();

  await context.initStores();

  let server;
  switch (environment.SERVICE_MODE) {
    case 'web-api':
      server = require('./mode/web-api/api')(environment);
      return server.start(environment);
    default:
      throw Error('server mode ERROR!');
  }
})().catch(err => {
  console.log(err);
  process.exit(1);
});