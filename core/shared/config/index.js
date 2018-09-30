class Config {

    load(env)
    {
        return new Promise(resolve => {
            resolve(require(`./${env}`))
        }).then(conf => {
            return conf;
        }).catch(() => {
            return new Error(`${env} config is not exists`);
        })
    }
}
module.exports = new Config();