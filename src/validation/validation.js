const {ResponseError} = require('../error/response-error.js');

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknow: false
    });
    if (result.error) {
        throw new ResponseError(400, result.error.message);
    } else {
        return result.value;
    }
};

module.exports = {
    validate
};