"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class EventUser extends Model {
        static associate(models) {
            EventUser.hasOne(models.Relation, {
                foreignKey: "eventUser",
                as: "relation",
            });
        }
    }

    EventUser.init(
        {
            event_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            attended: DataTypes.BOOLEAN,
            feedback: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "EventUser",
        }
    );

    return EventUser;
};
