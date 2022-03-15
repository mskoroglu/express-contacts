const { verifyToken } = require("./jwt");

module.exports = (req, res, next) => {
  if (req.path === "/auth/token") {
    return next();
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401);
  }

  verifyToken(
    token,
    (userId) => {
      req.userId = userId;
      next();
    },
    (error) => res.status(401).json(error)
  );
};
