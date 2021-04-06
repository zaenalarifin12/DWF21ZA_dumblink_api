const { User } = require("../../models");
const Joi = require("joi");

module.exports = async (req, res) => {
  try {
    const { name } = req.body;

    const schema = Joi.object({
      name: Joi.string().max(100).required(),
    });

    const { error } = schema.validate({ name });

    if (error) {
      return res.status(400).json({
        message: "error validation",
        error: {
          message: error.details[0].message,
        },
      });
    }

    const userId = req.userId.id;

    await User.update(
      {
        name: name,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    const user = await User.findOne({
        where :  {
            id : userId
        }
    })

    return res.json({
      status: "success",
      message: {
        user: user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
