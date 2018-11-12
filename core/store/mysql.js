const Sequelize = require('sequelize');

module.exports = {
    init: (conf) => {
        return new Sequelize(conf);
    },
    // TODO : 더 좋은 방법 찾기
    sync: (cont) => {
        const models = require('./model');

        console.log(models);

        return Promise.resolve().then(() => {
            for(let model in models) {
                models[model](cont).sync()
            }
        })
    }
};