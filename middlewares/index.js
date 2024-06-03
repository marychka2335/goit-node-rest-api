const { isValidId } = require('./isValidId');
const isEmptyField = require('./isEmptyField');
const {authenticate} = require('./authenticate')


module.exports = {
    isValidId,
    isEmptyField,
    authenticate
}