const os = require( 'os' );
const networkInterfaces = os.networkInterfaces( );

const shared   = require('../../core');
const services = shared.Dao;


// TODO :: OOP ???

module.exports = (express) => {

    const router = express.Router();

    router.get('/', (req, res) => {
        res.send(`This is my sample page!!! : + ${networkInterfaces.eth0[0].address}`);

        console.log('sample page');
    });

    // TODO wrap function

    router.post(
        '/artist/:sampleId',
        /*(req, res, next) => {
            req.checkParams('sampleId', 'required').isInt();
            req.getValidationResult()
                .then(result => {
                    if(!result.isEmpty()) {
                        // TODO : error handler
                        console.log('hoxy...?');
                    }
                    return next();
                })
        },*/ async(req, res) => {

            let struct = {
                id: req.params.sampleId,
                foo: req.query.foo,
                hoge: req.body.hoge
            };
            struct.data = await services.test.getTestById(struct.id);
            res.status(200).json(struct);
        });

    return router
};