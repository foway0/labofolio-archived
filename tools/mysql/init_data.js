(async () => {
  const env   = process.env.SERVICE_ENV;
  switch (env) {
    case 'local':
      console.log(`${env}環境にデータを入れます。`);
      break;
    default:
      console.error('引数が誤っています。localに指定して下さい');
      process.exit(1);
      break;
  }
  const {context} = require('../../core');

  await context.initStores();

  const sequelize = context.getStoresMysql();
  const models = context.getModels();

  const fixtures = require('./fixtures');
  const init_data_fixtures = {
    sample: models.sample,
  };
  const t = await sequelize.transaction();
  const notFound = [];

  try {
    for (const fixture in init_data_fixtures) {
      const data = fixtures[fixture];
      if (data)
        await init_data_fixtures[fixture](sequelize).bulkCreate(data, {transaction: t});
      else
        notFound.push(`${fixture}'s data is not exists.`)
    }
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
  console.log(...notFound);
  process.exit(0);
})().catch(err => {
  console.log(err);
  process.exit(1);
});