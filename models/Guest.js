"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Relation extends Model {
        static associate(models) {
            Relation.belongsTo(models.Event, {
                foreignKey: "event_id",
                as: "eventGuest",
            });
        }
    }

    Relation.init(
        {
            event_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Guest",
            tableName: "Guests",
        }
    );

    return Relation;
};
