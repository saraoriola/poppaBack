"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
      Organization.hasMany(models.User, {
        foreignKey: "organization_id",
        as: "users",
      });

      Organization.hasOne(models.Type, {
        foreignKey: "organization_id",
        as: "type",
      });
    }
  }
  Organization.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      web: DataTypes.STRING, //NOTE: Esto debe ser obligatorio?
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      tel: DataTypes.INTEGER, //NOTE: Esto debe ser obligatorio?
      representative: DataTypes.STRING, //NOTE: Esto debe ser obligatorio?
      patronage: DataTypes.BOOLEAN, //NOTE: Esto debe ser obligatorio?
    },
    {
      sequelize,
      modelName: "Organization",
      tableName: "organization", // NOTE: HE VISTO QUE SI LA TABLA SE LLAMA CON NOMBRE DIFERENTE (MAYUS-MINUS) HAY QUE ESPECIFICAR CON TABLENAME
    }
  );
  return Organization;
};
