const express = require('express');
const controllers = require('../../controllers')
const { isValidId } = require('../../middlewares');
const { isEmptyField } = reqire('../../middlewares/isEmptyField.js');
const { validateBody } = require('../../helpers/index.js');
const { addSchema, updateSchema} = require('../../schemas/addSchema')
const router = express.Router();

router.get('/', controllers.getListContacts)

router.get('/:contactId', isValidId, controllers.getContactByID)

router.post('/', isValidId, isEmptyField, validateBody(addSchema), controllers.addNewContact)

router.delete('/:contactId', isValidId, controllers.deleteContact)

router.put('/:contactId', isValidId, isEmptyField, validateBody(updateSchema), controllers.changeContact)

router.patch('/:contactId/favorite', controllers.updateStatusContact)

module.exports = router