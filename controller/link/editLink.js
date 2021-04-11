const { Links, Brand } = require("../../models");
const Joi = require("joi");
let fs = require("fs");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, links } = req.body;

    const schema = Joi.object({
      title: Joi.string().max(40).required(),
      description: Joi.string().max(40).required(),
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

    if (req.files.image != undefined) {
      // old brand form database
      const oldBrand = await Brand.findOne({
        where: {
          id: req.params.id,
        },
      });

      // remove image from server
      fs.stat(`./uploads/${oldBrand.image}`, function (err, stats) {
        console.log(stats);

        if (err) {
          return console.error(err);
        }

        fs.unlink(`./uploads/${oldBrand.image}`, function (err) {
          if (err) return console.log(err);
          console.log("file deleted successfully");
        });
      });

      const image = req.files.image[0].filename;

      await Brand.update(
        {
          title: title,
          description: description,
          image: image,
        },
        {
          where: {
            id: id,
          },
        }
      );
    } else {
      await Brand.update(
        {
          title: title,
          description: description,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }

    // jika gambar kosong

    let linkToJson = JSON.parse(links);

    linkToJson.map(async (link, index) => {
      if (link.id != 0) {
        const aa = await Links.update(
          {
            title: link.titleLink,
            url: link.urlLink,
            image: link.imageLink,
          },
          {
            where: {
              id: link.id,
            },
          }
        );
      } else {
        //   asa
        await Links.create({
          title: link.titleLink,
          url: link.urlLink,
          image: link.imageLink,
          brandId: req.params.id,
        });
      }
    });

    const brand = await Brand.findOne({
      where: {
        id: req.params.id,
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
