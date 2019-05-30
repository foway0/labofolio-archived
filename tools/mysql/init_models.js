(async () => {
  const {context} = require('../../core');

  await context.initStores();

  const sequelize = context.getStoresMysql();
  const fixtures = [
    require('./models').sample
  ];

  for(const fixture of fixtures) {
    await fixture(sequelize).sync();
  }

})().catch(err => {
  console.log(err);
  process.exit(1);
});