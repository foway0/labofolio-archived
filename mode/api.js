const core = require('../core');
const utils = require('../utils');

const context = core.context;

class Service extends core.Application {

  constructor(env) {
    super(env);
    // TODO use routes
    this.app.get('/', (req, res) => {
      res.status(200).json('ok');
    });
    this.app.get('/test', (req, res) => {
      res.status(200).json('test');
    });
    this.app.get('/ping', async (req, res) => {

      res.json('pong');
    });
    this.app.get('/time', async (req, res) => {
      const sequelize = context.getMysql();
      const result = await sequelize.query("SELECT now() as time", {
        type: sequelize.QueryTypes.SELECT,
        plain: true
      });

      res.json(result.time);
    });
    this.app.get('/error/:flag', (req, res) => {
      const flag = req.params.flag;

      // error handling test
      if(flag === 'true') {
        res.json('this is true');
      } else {
        throw new utils.error('woops', 'TEST', 500);
      }
    });
    // 404 not found
    this.app.get('*', function(req, res){
      res.status(404).send('what??? (╯°□°）╯︵ ┻━┻');
    });
    this.app.use((err, req, res, next) => {
      // Will get here
      res.status(err.statusCode).json({
        name: err.name,
        message: err.message,
      });
    });
  }
}

module.exports = env => {
 return new Service(env);
};