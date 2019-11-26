const OpenApiValidator = require('express-openapi-validator').OpenApiValidator;

const core = require('../../core');
const routes = require('./routes');

const context = core.context;
const {utils, middleware, locales} = context;
const code = context.constant.statusCode;
const {i18next, cors} = middleware;
const config = context.getConfig();

class Service extends core.Application {

  constructor(ctx) {
    super(ctx);
  }

  async init() {
    this.app.set('views', utils.parser.pathJoin(__dirname, 'views'));
    this.app.set('view engine', 'pug');
    this.app.use(cors(config.cors));
    // Install the I18next on your express app
    this.app.use(i18next('ko', ['ko', 'ja'], {
      ko: { translation: locales.ko },
      ja: { translation: locales.ja },
    }));
    // Install the OpenApiValidator on your express app
    new OpenApiValidator({
      apiSpec: utils.parser.pathJoin(__dirname, 'web-oas.yaml'),
    }).install(this.app);
    // Install the oauth on your express app
    const oauth_options = {
      clientID: this.ctx.environment.GOOGLE_CLIENT_ID,
      clientSecret: this.ctx.environment.GOOGLE_CLIENT_SECRET,
      callbackURL: config.oauth.callbackURL,
      login_url: config.oauth.login_url,
      login_url_redirect: config.oauth.login_url_redirect,
    };
    context.installOauth(this.app, oauth_options);

    // load route
    super.loadRoutes(routes);

    // TODO health Check
    this.app.get('/ping', async (req, res) => {
      const sequelize = context.getMysqlConnect();
      const result = await sequelize.query("SELECT 'pong'", {
        type: sequelize.QueryTypes.SELECT,
        plain: true
      });

      res.status(code.OK).send(result.pong);
    });

    // error handler
    this.app.use((err, req, res, next) => {
      // Will get here
      if(err.statusCode)
        res.status(err.statusCode).json({
          name: err.name,
          message: err.message,
        });
      // エラー扱いになるよ…
      else if(err.status && err.status === code.NOT_FOUND) {
        res.status(code.NOT_FOUND).send('what??? (╯°□°）╯︵ ┻━┻');
        this.logger.debug('line', `what??? (╯°□°）╯︵ ┻━┻`);
      } else if(err.status) {
        res.status(err.status).json({
          errors: err.errors,
        });
        this.logger.debug('json', {
          errors: err.errors,
        });
      } else {
        res.status(code.SERVICE_UNAVAILABLE).end();
        this.logger.debug('line', `503!!!`);
      }
    });
  }
}

module.exports = ctx => new Service(ctx);