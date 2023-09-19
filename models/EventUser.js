"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class EventUser extends Model {
        static associate(models) {
            // Relación 1:1 con Feedback
            EventUser.hasOne(models.Feedback, {
                foreignKey: "eventUserId", // Clave foránea en la tabla Feedback
                as: "feedback",
            });
        }
    }

    EventUser.init(
        {
            event_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            attended: DataTypes.BOOLEAN,
            feedback_id: DataTypes.INTEGER,
            leaveTime: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "EventUser",
            tableName: "eventusers",
        }
    );

    return EventUser;
};
