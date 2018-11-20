const context   = require('../context');
const stores    = require('../store/model');

module.exports = {
    getTestById: (id) => {
        const test = stores.test(context.getMysql());

        return test.findOne({
            where: {
                id: id
            }
        });
    }
};