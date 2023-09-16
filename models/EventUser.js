'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EventUser.init({
    event_id: DataTypes.NUMBER,
    user_id: DataTypes.NUMBER,
    attended: DataTypes.BOOLEAN,
    feedback: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EventUser',
  });
  return EventUser;
};