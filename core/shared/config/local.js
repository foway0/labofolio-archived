module.exports = {
    web: {
        port: 3000
    },
    stores: {
        mysql: {
            dialect: 'mysql',
            port: 3306,
            database: 'sample',
            operatorsAliases: false,
            replication: {
                read: [
                    { host: 'local-store-slave', username: 'foway', password: 'qwerty' },
                ],
                write: { host: 'local-store', username: 'root', password: 'password' }
            }
        },
        redis: {

        }
    },
};