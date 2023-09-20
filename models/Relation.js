"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Relation extends Model {
        static associate(models) {
            Relation.belongsTo(models.EventUser, {
                foreignKey: "eventUser_id",
                as: "eventUser",
            });
        }
    }

    Relation.init(
        {
            eventUser_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Relation",
            tableName: "Relations",
        }
    );

    return Relation;
};
