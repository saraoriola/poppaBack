"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Service_Provision extends Model {
    static associate(models) {
      Service_Provision.belongsToMany(models.Event, {
        through: models.Contracted_service,
        foreignKey: "service_id",
        as: "events",
      });
    }
  }

  Service_Provision.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Service_Provision",
      tableName: "service_provisions",
    }
  );

  return Service_Provision;
};
