require("dotenv").config();
const { User } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().max(40).required(),
      password: Joi.string().min(8).max(40),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "error validation",
        error: {
          message: error.details[0].message,
        },
      });
    }

    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.status(401).json({
        status: "login failed",
        message: "your credential is not failed",
      });
    }

    const { JWT_SECRET } = process.env;

    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    return res.json({
      status: "success",
      data: {
        user: {
          fullName: user.fullName,
          email: user.email,
          token: token,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
