const { encrypt, compare, generateToken } = require("../services/crypto");
const { generateOTP } = require("../services/OTP");
const { sendMail } = require("../services/MAIL");
const User = require("../model/User");
const bcrypt = require("bcrypt");

module.exports.signUpUser = async (req, res) => {
  const isExisting = await findUserByEmail(req.body.email);
  if (isExisting) {
    return res.status(409).send({ message: "Already existing" });
  }
  // create new user
  const newUser = await createUser(
    req.body.name,
    req.body.email,
    req.body.password
  );
  if (!newUser[0]) {
    return res.status(400).send({
      message: "Unable to create new user",
    });
  }
  res.send(newUser);
};

module.exports.signInUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const otpGenerated = generateOTP();
      await User.findByIdAndUpdate(
        user._id,
        {
          $set: { otp: otpGenerated },
        },
        { new: true }
      );
      try {
        await sendMail({
          to: req.body.email,
          OTP: otpGenerated,
        });
        // return [true, user];
      } catch (error) {
        return [false, "Unable to sign in, Please try again later", error];
      }
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        otp: otpGenerated,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
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
  const hashedPassword = bcrypt.hashSync(password, 8);
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
  const token = generateToken(newUser);
  try {
    await sendMail({
      to: email,
      OTP: otpGenerated,
    });
    return [true, newUser, token];
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
