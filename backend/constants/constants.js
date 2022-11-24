const dotenv = require('dotenv');
// import dotenv from "dotenv";
dotenv.config();

module.exports = {
  allowedOrigins: ['http://localhost:5000/'],
  SERVER_PORT: process.env.PORT || 5000,
//   SERVER_DB_URI: process.env.DB_URI,
  JWT_SECRET: 'thisIsASimpleTest',
  OTP_LENGTH: 6,
  OTP_CONFIG: {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  },
  MAIL_SETTINGS: {
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  },
};