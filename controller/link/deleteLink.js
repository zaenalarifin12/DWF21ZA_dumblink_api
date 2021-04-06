const { Brand, Links } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { uniqueLink } = req.params;

    const brandFromDB = await Brand.findOne({
      where: { uniqueLink: uniqueLink },
    });

    if (brandFromDB == null) {
      return res.status(404).json({
        message: "not found",
      });
    }

    await Brand.destroy({
      where: { uniqueLink: uniqueLink },
    });

    return res.json({
      status: "delete successfully",
      data: {
        link: 1,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
