const shared = require('./shared');
const store  = require('./store');

const env  = shared.environment.SERVICE_ENV,
      mode = shared.environment.SERVICE_MODE;

class Context {

    constructor() {
        this.stores = {};
    }

    init() {
        return shared.config.load(env)
            .then(conf => {
                this.conf = conf;
            })
            .then(() => {
                return this.initStore();
            })
            .then(() => {
                return mode;
            })
            .catch();
    }

    async initStore() {
        console.log(`======================== TODO : init store ========================`);
        this.stores.mysql = store.mysql.init(this.conf.stores.mysql);
        await this.stores.mysql.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        console.log(`======================== TODO : init store ========================`);

        console.log(`======================== TODO : sync store ========================`);
        await store.mysql.sync(this.stores.mysql);
        console.log(`======================== TODO : sync store ========================`);
    }
}

module.exports = new Context();