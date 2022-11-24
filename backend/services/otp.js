const otpGenerator = require("otp-generator");
const { OTP_LENGTH, OTP_CONFIG } = require('../constants/constants');
// const OTP_LENGTH = 10;
// const OTP_CONFIG = {
//   upperCaseAlphabets: true,
//   specialChars: false,
// };
module.exports.generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
};
