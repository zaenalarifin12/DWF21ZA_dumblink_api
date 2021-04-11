const { Brand } = require("../../models");

module.exports = async (req, res) => {
  try {
    await Brand.update(
      {
        active: 0,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.json({
      message: "berhasil",
    });
  } catch (error) {}
};
