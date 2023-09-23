"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            Role.belongsTo(models.User, {
                foreignKey: "User_id",
                as: "user",
            });
        }
    }

    Role.init(
      {
        User_id: DataTypes.INTEGER,
        type: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Role",
        tableName: "Roles",
      }
    );

    return Role;
};
