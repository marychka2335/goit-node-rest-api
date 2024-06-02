const express = require('express');
const controllers = require('../../controllers');
const { upload } = require('../../middlewares');
const router = express.Router();

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.get('/current', controllers.getCurrent);
router.post('/logout', controllers.logout);
router.patch('/', controllers.updateUserSub),
router.patch('/avatars', upload.single('avatar'), controllers.updateAvatar)

module.exports = router