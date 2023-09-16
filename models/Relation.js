'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Relation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Relation.init({
    eventUser: DataTypes.NUMBER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Relation',
  });
  return Relation;
};