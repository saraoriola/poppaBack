"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Relation extends Model {
        static associate(models) {
            Relation.belongsTo(models.EventUser, {
                foreignKey: "eventUser",
                as: "eventoUsuario",
            });
        }
    }

    Relation.init(
      {
        eventUser: DataTypes.INTEGER,
        name: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Relation",
        tableName: "relations",
      }
    );

    return Relation;
};
