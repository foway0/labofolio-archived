const shared   = require('../../core');
const services = shared.Dao;

module.exports = (express) => {

    const router = express.Router();

    router.get('/', (req, res) => {
        res.send(`This is my sample page!!! : + ${networkInterfaces.eth0[0].address}`);

        console.log('sample page');
    });

    // TODO wrap function

    router.get('/artist', async(req, res) => {

        console.log('=================');
        console.log(services);
        console.log('=================');

        const result = await services.test.getTestById(1);
        res.status(200).json(result);
    });

    return router
};

const os = require( 'os' );

const networkInterfaces = os.networkInterfaces( );