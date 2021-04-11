const { Brand, Links } = require("../../models");

// const { Links } = require("../../models");

module.exports = async (req, res) => {
  try {
    // let link = null;

    const { uniqueLink } = req.params;

    const brandFromDB = await Brand.findOne({
      where: { uniqueLink: uniqueLink, active: 1 },
    });

    if (brandFromDB == null) {
      return res.status(404).json({
        message: "not found",
      });
    }

    const updateBrand = await Brand.update(
      {
        viewCount: brandFromDB.viewCount + 1,
      },
      {
        where: { uniqueLink: uniqueLink },
      }
    );

    const brand = await Brand.findOne({
      where: { uniqueLink: uniqueLink },
      attributes: [
        "id",
        "title",
        "image",
        "template",
        "description",
        "uniqueLink",
        "viewCount",
      ],
      include: [
        {
          model: Links,
          as: "links",
          attributes: ["id", "title", "url", "image"],
        },
      ],
    });

    return res.json({
      status: "success",
      data: {
        link: brand,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
