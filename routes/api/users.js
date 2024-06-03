const express = require('express');
const controllers = require('../../controllers');
const { validateBody } = require('../../helpers/index.js');
const { authenticate, upload } = require('../../middlewares');
const { validateBody } = require('../../helpers/index.js');
const { userSchema } = require('../../schemas/userSchema');
const { updateUserSchema } = require('../../schemas/updateUserSchema')
const router = express.Router();

router.post('/register',  validateBody(userSchema), controllers.register);
router.post('/login',  validateBody(userSchema),controllers.login);
router.get('/current', authenticate, controllers.getCurrent);
router.post('/logout', authenticate, controllers.logout);
router.patch('/', authenticate, validateBody(updateUserSchema), controllers.updateUserSub),
router.patch('/avatars', authenticate, upload.single('avatar'), controllers.updateAvatar)

module.exports = router