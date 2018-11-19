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
            retry: {
                max: 3,
            },
            replication: {
                read: [
                    { host: 'local-store-slave', username: 'foway', password: 'qwerty' },
                ],
                write: { host: 'local-store', username: 'foway', password: 'qwerty' }
            }
        },
        redis: {

        }
    },
};