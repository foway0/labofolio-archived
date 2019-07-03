(async () => {
  const {context} = require('../../core');

  await context.initStores();

  const sequelize = context.getStoresMysql();
  const models = context.getModels();
  const fixtures = [
    models.sample
  ];

  for(const fixture of fixtures) {
    await fixture(sequelize).sync();
  }
  process.exit(0);
})().catch(err => {
  console.log(err);
  process.exit(1);
});