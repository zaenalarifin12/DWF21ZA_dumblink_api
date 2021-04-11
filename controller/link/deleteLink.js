const { Brand, Links } = require("../../models");
const fs = require("fs");

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

    /**
     * remove image from links
     */

    const links = await Links.findAll({
      where: {
        brandId: brandFromDB.id,
      },
    });

    links.map((link) => {
      fs.stat(`./uploads/${link.image}`, function (err, stats) {
        console.log(stats);

        if (err) {
          return console.error(err);
        }

        fs.unlink(`./uploads/${link.image}`, function (err) {
          if (err) return console.log(err);
          console.log("file deleted successfully");
        });
      });
    });
    /**
     * remove image from brand db
     */
    fs.stat(`./uploads/${brandFromDB.image}`, function (err, stats) {
      console.log(stats);

      if (err) {
        return console.error(err);
      }

      fs.unlink(`./uploads/${brandFromDB.image}`, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
      });
    });

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
