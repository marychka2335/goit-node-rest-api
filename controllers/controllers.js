const Contact = require('../models/contact');
const { HttpError } = require('../helpers');
const schemas = require('../schemas');

const getListContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const getContactByID = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
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
    const result = await Contact.create(newContact);
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
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
      throw HttpError(400, error.message)
    }
    const result = await Contact.findByIdAndUpdate(contactId, updateContact, {new: true});
    if (!result) {
      throw HttpError(404, 'Not Found')
    }
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
      const { contactId } = req.params;
    const updateContact = req.body;
    const { error } = schemas.updateFavoriteSchema.validate(updateContact);
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await Contact.findByIdAndUpdate(contactId, updateContact, {new: true});
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
    getContactByID,
    addNewContact,
    deleteContact,
    changeContact,
    updateStatusContact
}