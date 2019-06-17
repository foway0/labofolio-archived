const OpenApiValidator = require('express-openapi-validator').OpenApiValidator;

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
    // 1. Install the OpenApiValidator on your express app
    new OpenApiValidator({
      apiSpecPath: utils.parser.pathJoin(__dirname, 'web-oas.yaml'),
    }).install(this.app);

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
    // TODO custom error handler oas
    this.app.use((err, req, res, next) => {
      // Will get here
      if(err.statusCode)
        res.status(err.statusCode).json({
          name: err.name,
          message: err.message,
        });
      else if(err.status)
        res.status(err.status).json({
          errors: err.errors,
        });
      else
        res.status(code.SERVICE_UNAVAILABLE).end();

    });
  }
}

module.exports = env => {
  return new Service(env);
};