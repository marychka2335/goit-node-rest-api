const express = require('express');
const controllers = require('../../controllers');
const { isValidId } = require('../../middlewares');
const router = express.Router();

router.get('/', controllers.getListContacts)

router.get('/:contactId', isValidId, controllers.getContactByID)

router.post('/', controllers.addNewContact)

router.delete('/:contactId', isValidId, controllers.deleteContact)

router.put('/:contactId', isValidId, controllers.changeContact)

router.patch('/:contactId/favorite', controllers.updateStatusContact)

module.exports = router