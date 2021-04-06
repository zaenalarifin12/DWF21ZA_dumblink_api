require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.authenticated = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    return res.status(400).send({
      status: "failed",
      message: "Access denied",
    });
  }

  try {
    const { JWT_SECRET } = process.env;

    const verified = jwt.verify(token, JWT_SECRET);

    req.userId = verified;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid token",
    });
  }
};
