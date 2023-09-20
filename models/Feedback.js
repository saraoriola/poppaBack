"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Feedback extends Model {
        static associate(models) {
            Feedback.belongsTo(models.EventUser, {
                foreignKey: "eventUser_id",
                as: "eventUser",
            });
        }
    }
    Feedback.init(
        {
            valoration: DataTypes.INTEGER,
            comments: DataTypes.STRING,
            eventUser_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Feedback",
            tableName: "Feedback",
        }
    );
    return Feedback;
};
