"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Event extends Model {
        static associate(models) {
            Event.belongsTo(models.Location, {
                foreignKey: "location_id",
                as: "location",
            });

            Event.belongsToMany(models.Service_Provision, {
                through: models.Contracted_service,
                foreignKey: "event_id",
                as: "service_provisions",
            });

            Event.belongsToMany(models.User, {
                through: models.EventUser,
                foreignKey: "event_id",
                as: "users",
            });
        }
    }

    Event.init(
        {
            location_id: DataTypes.INTEGER,
            dateTime: DataTypes.STRING,
            duration_min: DataTypes.INTEGER,
            type: DataTypes.STRING,
            banner: DataTypes.STRING,
            description: DataTypes.STRING,
            title: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Event",
        }
    );

    return Event;
};
