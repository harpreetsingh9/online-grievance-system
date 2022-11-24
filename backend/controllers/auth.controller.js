const { encrypt, compare } = require("../services/crypto");
const { generateOTP } = require("../services/OTP");
const { sendMail } = require("../services/MAIL");
const User = require("../model/User");

module.exports.signUpUser = async (req, res) => {
  // const { name, email, password } = req.body;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const isExisting = await findUserByEmail(email);
  if (isExisting) {
    return res.send("Already existing");
  }
  // create new user
  const newUser = await createUser(name, email, password);
  if (!newUser[0]) {
    return res.status(400).send({
      message: "Unable to create new user",
    });
  }
  res.send(newUser);
};

module.exports.verifyEmail = async (req, res) => {
  const { data, otp } = req.body;
  const user = await validateUserSignUp(data, otp);
  console.log(user);
  res.send(user);
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

const createUser = async (name, email, password) => {
  const hashedPassword = await encrypt(password);
  const otpGenerated = generateOTP();
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    otp: otpGenerated,
  });
  if (!newUser) {
    return [false, "Unable to sign you up"];
  }
  try {
    await sendMail({
      to: email,
      OTP: otpGenerated,
    });
    return [true, newUser];
  } catch (error) {
    return [false, "Unable to sign up, Please try again later", error];
  }
};

const validateUserSignUp = async (email, otp) => {
  console.log(email, otp);
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return [false, "User not found"];
  }
  if (user && user.otp !== otp) {
    return [false, "Invalid OTP"];
  }
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: { active: true },
    },
    { new: true }
  );
  return [true, updatedUser];
};
