(async () => {
  const {context} = require('../../core');
  const shared = require('../../shared');
  context.setParams('environment', shared.environment);
  context.setParams('constant', shared.constant);
  context.setParams('config', shared.config);
  context.setParams('models', require('./models'));

  await context.initStores();

  const sequelize = context.getMysqlConnect();
  const models = context.models;
  const fixtures = [
    models.sample,
    models.user,
  ];

  for(const fixture of fixtures) {
    await fixture(sequelize).sync();
  }
  process.exit(0);
})().catch(err => {
  console.log(err);
  process.exit(1);
});