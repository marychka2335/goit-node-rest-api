const express = require('express');
const controllers = require('../../controllers');
const { isValidId, authenticate } = require('../../middlewares');
const { isEmptyField } = reqire('../../middlewares/isEmptyField.js');
const { validateBody } = require('../../helpers/index.js');
const { addSchema, updateSchema} = require('../../schemas/addSchema')
const router = express.Router();

router.get('/', authenticate, controllers.getListContacts)

router.get('/:contactId', authenticate, isValidId, controllers.getContactByID)

router.post('/', authenticate, isValidId, isEmptyField, validateBody(addSchema), controllers.addNewContact)

router.delete('/:contactId', authenticate, isValidId, controllers.deleteContact)

router.put('/:contactId', authenticate, isValidId, isEmptyField, validateBody(updateSchema), controllers.changeContact)

router.patch('/:contactId/favorite', authenticate, controllers.updateStatusContact)

module.exports = router