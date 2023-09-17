"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Amenities extends Model {
        static associate(models) {
            Amenities.belongsToMany(models.Location, {
                through: models.Location_amenities,
                foreignKey: "amenities_id",
                as: "locations",
            });
        }
    }
    Amenities.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Amenities",
        }
    );
    return Amenities;
};