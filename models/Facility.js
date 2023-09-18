"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Facility extends Model {
        static associate(models) {
            Facility.hasMany(models.Location, {
                foreignKey: "facility_id",
                as: "locations",
            });
        }
    }
    Facility.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: DataTypes.STRING, //NOTE: Esto debe ser obligatorio? Resp.: Si, lo piden los de ux
        },
        {
            sequelize,
            modelName: "Facilities",
            tableName: "Facilities",
        }
    );
    return Facility;
};
