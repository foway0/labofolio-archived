module.exports = (express) => {

    const router = express.Router();

    router.get('/', (req, res) => {
        res.send('This is my sample page!!!');

        console.log('sample page');
    });

    router.get('/artist', (req, res) => {
        res.send('This is my sample artist page!!!');

        console.log('artist page');
    });

    return router
};