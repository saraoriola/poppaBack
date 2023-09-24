"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Guests extends Model {
        static associate(models) {
            Guests.belongsTo(models.Event, {
                foreignKey: "event_id",
                as: "eventGuest",
            });
        }
    }

    Guests.init(
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

    return Guests;
};
