'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Organization.init({
    name: DataTypes.STRING,
    web: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.NUMBER,
    representative: DataTypes.STRING,
    patronage: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};