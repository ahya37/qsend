const config = require('../config/auth');
const db = require('../models');
const User = db.user;
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validate} = require('../validation/validation');
const { registerValidation } = require('../validation/auth.validation');
const { ResponseError } = require('../error/response-error');

exports.register = (req, res) => {

    if (!req.body.name || !req.body.phone || !req.body.email || !req.body.password) {
        res.status(400).json({
            message: 'request is invalid!'
        });
    }

    const user = validate(registerValidation, req.body);

    const countUser = User.findOne({
        where:{
            email: user.email
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, 'Username already exists');
    }
    
    User.create({
        name: user.name,
        phone: user.phone,
        email: user.email,
        password: bycript.hashSync(user.password, 8),
    }).then((result) => {
        res.status(200).json({
            data: result,
            message: 'user was registerd successfully!',
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        });
    });
};

exports.login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {

        if (!user) {
            return res.status(404).json({message:'User not found'});
        }
        let passwordIsValid = bycript.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: 'invalid password!'
            });
        }

        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400, // 24 jam
        });

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.emal,
            accessToken: token
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        });
    });
};
