require("dotenv").config();

const bcrypt = require("bcrypt");
const { User } = require("../../models");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const schema = Joi.object({
      email: Joi.string().min(5).max(40).required().email(),
      password: Joi.string().min(8).max(40).trim().required(),
      name: Joi.string().max(100).required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "validation failed",
        error: {
          message: error.details[0].message,
        },
      });
    }

    const user = await User.findOne({
      where: { email, email },
    });

    if (user) {
      return res.status(409).json({
        status: "register failed",
        message: "email already registered",
      });
    }

    const hashStrength = 10;
    const encrypPassword = await bcrypt.hash(password, hashStrength);

    const data = {
      email: email,
      password: encrypPassword,
      name: name,
    };

    const createUser = await User.create(data);

    const { JWT_SECRET } = process.env;

    const token = jwt.sign({ id: createUser.id }, JWT_SECRET);

    return res.json({
      status: "success",
      data: {
        user: {
          name: createUser.name,
          email: createUser.email,
          token: token,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
