const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../config/orm/models");
const { generateToken } = require("../lib/jwt");

router.post("/token", async function (req, res, next) {
  const credentials = req.body;
  const user = await User.findOne({ where: { login: credentials.login } });
  const matches = bcrypt.compareSync(credentials.password, user.passwordHash);
  if (!matches) {
    res.status(401).end();
  }

  const token = generateToken(user.id);
  res.json({ token });
});

module.exports = router;
