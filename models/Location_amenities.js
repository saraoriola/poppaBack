"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Location_amenities extends Model {
        static associate(models) {}
    }
    Location_amenities.init(
      {
        location_id: DataTypes.INTEGER,
        amenities_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: "Location_amenities",
        tableName: "location_amenities",
      }
    );
    return Location_amenities;
};
