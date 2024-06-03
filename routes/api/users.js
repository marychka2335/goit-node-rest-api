const express = require('express');
const controllers = require('../../controllers');
const { authenticate } = require('../../middlewares');
const { isEmptyField } = reqire('../../middlewares/isEmptyField.js');
const { validateBody } = require('../../helpers/index.js');
const { userSchema } = require('../../schemas/userSchema');
const { updateUserSchema } = require('../../schemas/updateUserSchema')


const router = express.Router();


router.post('/register', isEmptyField, validateBody(userSchema), controllers.register);
router.post('/login', controllers.login);
router.get('/current', authenticate, controllers.getCurrent);
router.post('/logout', authenticate, isEmptyField, validateBody(updateUserSchema), controllers.logout);
router.patch('/', authenticate, controllers.updateUser)


module.exports = router