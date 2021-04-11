"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Links extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Links.belongsTo(models.Brand, {
        foreignKey: "brandId",
        as: "brand",
      });
    }
  }
  Links.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      image: DataTypes.STRING,
      brandId: DataTypes.INTEGER,
      
    },
    {
      sequelize,
      modelName: "Links",
    }
  );
  return Links;
};
