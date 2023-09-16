'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location_amenities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Location_amenities.init({
    location_id: DataTypes.NUMBER,
    amenities_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Location_amenities',
  });
  return Location_amenities;
};