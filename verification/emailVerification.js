const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: "node_js@meta.ua",
    pass: META_PASSWORD
  }
}

const transport = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
    const emailOptions = { ...data, from: "node_js@meta.ua" };
    transport
  .sendMail(emailOptions)
  .then(info => console.log(info))
  .catch(err => console.log(err));
}

module.exports = sendEmail

// const emailOptions = {
//   from: 'goitnodejs@meta.ua',
//   to: 'noresponse@gmail.com',
//   subject: 'Nodemailer test',
//   text: 'Привіт. Ми тестуємо надсилання листів!',
// };