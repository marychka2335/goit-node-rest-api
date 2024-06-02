const express = require('express');
const controllers = require('../../controllers');
const { isEmptyField } = reqire('../../middlewares/isEmptyField.js');
const { validateBody } = require('../../helpers/index.js');
const { authenticate, upload } = require('../../middlewares');
const router = express.Router();

router.post('/register', isEmptyField, validateBody(userSchema), controllers.register);
router.get('/verify/:verificationToken', controllers.verifyEmail);
router.post('/verify', controllers.resendVerifyEmail);
router.post('/login', isEmptyField, validateBody(userSchema),controllers.login);
router.get('/current', authenticate, controllers.getCurrent);
router.post('/logout', authenticate, controllers.logout);
router.patch('/', authenticate, isEmptyField, validateBody(updateUserSchema), controllers.updateUserSub),
router.patch('/avatars', authenticate, upload.single('avatar'), controllers.updateAvatar);


module.exports = router
