const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.userId.id,
      },
    });

    return res.json({
      status: "Successfully",
      message: "deleted user Successfully",
    });
  } catch (error) {}
};
