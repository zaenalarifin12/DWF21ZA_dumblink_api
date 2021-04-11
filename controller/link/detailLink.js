const { link } = require("joi");
const { Brand, Links } = require("../../models");

// const { Links } = require("../../models");

module.exports = async (req, res) => {
  try {
    // let link = null;

    const { id } = req.params;

    const brandFromDB = await Brand.findOne({
      where: { id: id },
    });

    if (brandFromDB == null) {
      return res.status(404).json({
        message: "not found",
      });
    }

    let DetailBrand;

    const brand = await Brand.findOne({
      where: { id: id },
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
    }).then((brand) => {
      const url = req.protocol + "://" + req.get("host") + "/uploads/";

      if (brand != null) {
        DetailBrand = {
          id: brand.id,
          title: brand.title,
          description: brand.description,
          template: brand.template,
          uniqueLink: brand.uniqueLink,
          image: url + brand.image,

          viewCount: brand.viewCount,
          links: brand.links.map((l) => ({
            id: l.id,
            title: l.title,
            url: l.url,
            image: url + l.image,
            imageAsli: l.image,
          })),
        };
      }
    });

    return res.json({
      status: "success",
      data: {
        link: DetailBrand,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
