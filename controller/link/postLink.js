const { Links, Brand } = require("../../models");
const Joi = require("joi");
const multer = require("multer");

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = async (req, res) => {
  try {
    const { template, title, description, links } = req.body;

    const schema = Joi.object({
      title: Joi.string().min(5).max(40).required(),
      description: Joi.string().min(5).max(40).required(),
    });

    const { error } = schema.validate({ title, description });

    if (error) {
      return res.status(400).json({
        message: "error validation",
        error: {
          message: error.details[0].message,
        },
      });
    }

    const image = req.files.image[0].filename;

    const newLink = await Brand.create({
      title: title,
      description: description,
      uniqueLink: makeid(10),
      image: image,
      userId: req.userId.id,
      template: template,
    });

    let linkToJson = JSON.parse(links);

    const newLinks = linkToJson.map((link, index) => ({
      title: link.titleLink,
      url: link.urlLink,
      image: link.imageLink,
      brandId: newLink.id,
    }));

    const allLinks = await Links.bulkCreate(newLinks);

    const brand = await Brand.findOne({
      where: {
        id: newLink.id,
      },
      attributes: ["id", "title", "description", "uniqueLink", "viewCount"],

      include: [
        {
          model: Links,
          as: "links",
          attributes: ["id", "title", "image"],
        },
      ],
    });

    return res.json({
      status: "success",
      data: {
        links: brand,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
