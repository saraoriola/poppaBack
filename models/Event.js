'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    location_id: DataTypes.NUMBER,
    dateTime: DataTypes.STRING,
    duration_min: DataTypes.NUMBER,
    type: DataTypes.STRING,
    banner: DataTypes.STRING,
    description: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};