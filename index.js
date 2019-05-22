(async () => {
  const {context} = require('./core');
  const environment = context.getEnv();

  await context.initStores();

  let server;
  switch (environment.SERVICE_MODE) {
    case 'web-api':
      server = require('./mode/web-api/app')(environment);
      await server.init();
      return server.start(environment);
    default:
      throw Error('server mode ERROR!');
  }
})().catch(err => {
  console.log(err);
  process.exit(1);
});