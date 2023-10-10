const Joi = require('joi');

const registerValidation = Joi.object({
    name: Joi.string().max(100),
    phone: Joi.string().max(15),
    email: Joi.string(),
    password: Joi.string().max(100),
});

module.exports = {
    registerValidation
};