const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports.generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

module.exports.isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
}

module.exports.encrypt = async (data) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data, salt);
    return hash;
  } catch (error) {
    return false;
  }
};

module.exports.compare = async (data, hash) => {
  const value = await bcrypt.compare(data, hash);
  return value;
};
