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
            eventUser_id: DataTypes.INTEGER,
            valoration: DataTypes.INTEGER,
            comments: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Feedback",
            tableName: "Feedback",
        }
    );
    return Feedback;
};
