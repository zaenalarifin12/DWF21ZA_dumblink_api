"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brand.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      Brand.hasMany(models.Links, {
        foreignKey: "brandId",
        as: "links",
      });
    }
  }
  Brand.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      template: DataTypes.TEXT,
      uniqueLink: DataTypes.STRING,
      image: DataTypes.TEXT,
      viewCount: DataTypes.INTEGER,
      active: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Brand",
    }
  );
  return Brand;
};
