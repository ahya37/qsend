const middleware = require('../middleware');
const controller = require('../controllers/saldo.controller');

module.exports = (app) => {

    app.use(function(req, res, next){
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        );

        next();
    });

    app.post('/api/saldo', middleware.verifyToken, controller.create);
};