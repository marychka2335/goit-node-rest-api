const contacts = require('../models/contacts');
const { HttpError } = require('../helpers');
const schemas = require('../schemas')

const getListContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, 'Not Found')
    }
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
} 

const addNewContact = async (req, res, next) => {
  try {
    const newContact = req.body;
    const { error } = schemas.addSchema.validate(newContact);
    if (error) {
      console.log(error)
      throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(newContact);
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
     if (!result) {
      throw HttpError(404, 'Not Found')
    }
    res.status(200).json({message: "contact deleted"})
  } catch (error) {
    next(error)
  }
}

const changeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = req.body;
    const { error } = schemas.addSchema.validate(updateContact);
    if (error) {
      console.log(error)
      throw HttpError(400, error.message)
    }
    const result = await contacts.updateContact(contactId, updateContact);
    if (!result) {
      throw HttpError(404, 'Not Found')
    }
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
    getListContacts,
    getContact,
    addNewContact,
    deleteContact,
    changeContact
}