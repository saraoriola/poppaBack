"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class EventUser extends Model {
        static associate(models) {
            EventUser.hasOne(models.Feedback, {
                foreignKey: "eventUser_id",
                as: "feedback",
            });
            EventUser.belongsTo(models.Event, { foreignKey: 'event_id', as: 'Event' });
            EventUser.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
        }
    }

    EventUser.init(
        {
            event_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            arriveTime: DataTypes.DATE,
            qrtoken: DataTypes.STRING,
            leaveTime: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "EventUser",
            tableName: "EventUsers",
        }
    );

    return EventUser;
};

