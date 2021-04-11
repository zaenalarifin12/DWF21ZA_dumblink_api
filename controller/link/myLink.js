const { Brand, Links } = require("../../models");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const search = req.query.search;

    let brands = [];

    if (search != null) {
      const brand = await Brand.findAll({
        where: {
          title: {
            [Op.like]: `%${search}%`,
          },
          userId: req.userId.id,
        },
        attributes: [
          "id",
          "title",
          "image",
          "description",
          "uniqueLink",
          "viewCount",
          "active"
        ],
        order: [["createdAt", "DESC"]],
      }).then((brand) => {
        const url = req.protocol + "://" + req.get("host") + "/uploads/";

        if (brand != null) {
          brands = brand.map((b) => ({
            id: b.id,
            title: b.title,
            description: b.description,
            uniqueLink: b.uniqueLink,
            image: url + b.image,
            viewCount: b.viewCount,
            active: b.active
          }));
        }
      });
    } else {
      const brand = await Brand.findAll({
        where: {
          userId: req.userId.id,
        },
        attributes: [
          "id",
          "title",
          "image",
          "description",
          "uniqueLink",
          "viewCount",
          "active"
        ],
        order: [["createdAt", "DESC"]],
      }).then((brand) => {
        const url = req.protocol + "://" + req.get("host") + "/uploads/";

        if (brand != null) {
          brands = brand.map((b) => ({
            id: b.id,
            title: b.title,
            description: b.description,
            uniqueLink: b.uniqueLink,
            image: url + b.image,
            viewCount: b.viewCount,
            active: b.active
          }));
        }
      });
    }

    return res.json({
      status: "success",
      data: {
        links: brands,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
