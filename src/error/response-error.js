class ResponseError extends Error {
    // eslint-disable-next-line constructor-super
    constructor(status, message){
        super(message);
        this.status = status;
    }
}

module.exports = {
    ResponseError
};