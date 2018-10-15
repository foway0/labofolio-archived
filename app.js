const Sequelize = require('sequelize');
const sequelize = new Sequelize('sample', 'foway', 'qwerty', {
    host: 'local-store',
    dialect: 'mysql',
    operatorsAliases: false,
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const core = require('./core');

let app = null;

core.Context.init()
    .then(mode => {
        switch (mode) {
            case 'api' :
                app = require('./api');
                break;
            default    :
                throw new Error(`${mode} is not supported yet`);
        }
    })
    .then(() => {
        app.start();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });