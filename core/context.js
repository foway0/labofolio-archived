const shared = require('./shared');

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
                this.initStore();
            })
            .then(() => {
                return mode;
            })
            .catch();
    }

    initStore() {
        console.log(`======================== TODO : init store ========================`);
        console.log(this.conf.stores);
        console.log(`======================== TODO : init store ========================`);
    }
}

module.exports = new Context();