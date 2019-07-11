(async () => {
  const {context} = require('./core');

  await context.initStores();
  context.initServices();
  context.initBugsnag();

  let server;
  switch (context.environment.SERVICE_MODE) {
    case 'web-api':
      server = require('./mode/web-api/app')(context);
      await server.init();
      return server.start();
    default:
      throw Error('server mode ERROR!');
  }
})().catch(err => {
  console.log(err);
  process.exit(1);
});