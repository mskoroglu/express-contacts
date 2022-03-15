const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/constants");

module.exports.generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1800s" }, undefined);
};

module.exports.verifyToken = (token, onSuccess, onError) => {
  jwt.verify(token, JWT_SECRET, {}, (err, payload) => {
    if (err) {
      onError(err);
    } else {
      onSuccess(payload.userId);
    }
  });
};
