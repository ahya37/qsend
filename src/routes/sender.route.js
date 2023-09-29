const middleware = require('../middleware');
const controller = require('../controllers/sender.controller');

module.exports = (app) => {
    app.use(function(req, res, next){
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        );

        next();
    });

    app.post('/api/sender', middleware.verifyToken, controller.create);
    app.post('/api/sender/sendmessage', middleware.verifyToken, controller.senMessage);
};