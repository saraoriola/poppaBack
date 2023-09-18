"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Service_company extends Model {
    static associate(models) {
      Service_company.hasMany(models.Contracted_service, {
        foreignKey: "service_company_id",
        as: "contracted_services",
      });
    }
  }

  Service_company.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      tel: DataTypes.INTEGER, //NOTE: Esto debe ser obligatorio?
      speciality: DataTypes.STRING, //NOTE: Esto debe ser obligatorio?
    },
    {
      sequelize,
      modelName: "Service_company",
    }
  );

  return Service_company;
};
