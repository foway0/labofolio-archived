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