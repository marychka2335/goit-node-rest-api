const { HttpError } = require('./HttpError');
const { handleMongooseError } = require('./handleMongooseError')
const { validateBody } = (schema) => {
    const func = (req, _, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, error.message));
        }
        next();
    };
    return func;
};
module.exports = {
    HttpError,
    handleMongooseError,
    validateBody
}