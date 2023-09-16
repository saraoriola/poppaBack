// Modelo Facility
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class FACILITY extends Model {
        static associate(models) {
            FACILITY.hasMany(models.Location, {
                foreignKey: "facility_id",
                as: "locations",
            });
        }
    }
    FACILITY.init(
        {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "FACILITY",
        }
    );
    return FACILITY;
};
