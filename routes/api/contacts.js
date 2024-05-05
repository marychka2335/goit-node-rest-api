const express = require('express');
const controllers = require('../../controllers')
const router = express.Router();

router.get('/', controllers.getListContacts)

router.get('/:contactId', controllers.getContact)

router.post('/', controllers.addNewContact)

router.delete('/:contactId', controllers.deleteContact)

router.put('/:contactId', controllers.changeContact)

module.exports = router