const User = require("../models/user");
const { HttpError } = require("../helpers");
const schemas = require("../schemas");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {updateUserSchema }= require('../schemas')
require('dotenv').config();

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { error } = schemas.userSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
        const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

        const payload = {
            id: user._id
        }
    
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
        await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
    
  } catch (error) {
    next(error)
  }
};

const getCurrent =  (req, res) => {
    const { email } = req.user;
    res.status(200).json({
        email: email,
      subscription: req.user.subscription,
    })
}

const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: '' });
        res.status(204)
    } catch (error) {
        next(error)
    }
}


const updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await User.findByIdAndUpdate(_id, req.body, {new: true});
    if (!result) {
      throw HttpError(404, 'Not Found')
    }
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
    login,
    getCurrent,
  logout,
        updateUser
};