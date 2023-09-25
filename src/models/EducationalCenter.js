"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class EducationalCenter extends Model {
        static associate(models) {
            // Relación 1:1 con Type
            EducationalCenter.belongsTo(models.Type, {
                foreignKey: "type_id",
                as: "type",
            });
        }
    }
    EducationalCenter.init(
        {
            type_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "EducationalCenter",
            tableName: "EducationalCenter",
        }
    );
    return EducationalCenter;
};
