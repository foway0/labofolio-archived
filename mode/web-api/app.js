const core = require('../../core');
const routes = require('./routes');

const context = core.context;
const utils = context.getUtils();
const code = context.getConst().statusCode;

class Service extends core.Application {

  constructor(env) {
    super(env);
  }

  async init() {
    // load route
    super.loadRoutes(routes);

    this.app.get('/ping', async (req, res) => {
      const sequelize = context.getStoresMysql();
      const result = await sequelize.query("SELECT 'pong'", {
        type: sequelize.QueryTypes.SELECT,
        plain: true
      });

      res.status(code.OK).send(result.pong);
    });

    this.app.get('/error', (req, res) => {
      throw new utils.error('woops', 'TEST', code.BAD_REQUEST);
    });
    // 404 not found
    this.app.get('*', (req, res) => {
      res.status(code.NOT_FOUND).send('what??? (╯°□°）╯︵ ┻━┻');
    });
    // TODO custom error handler oas
    this.app.use((err, req, res, next) => {
      // Will get here
      if(err.statusCode)
        res.status(err.statusCode).json({
          name: err.name,
          message: err.message,
        });
      else
        res.status(code.SERVICE_UNAVAILABLE).end();

    });
  }
}

module.exports = env => {
  return new Service(env);
};