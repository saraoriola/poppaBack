'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service_company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service_company.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.NUMBER,
    speciality: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Service_company',
  });
  return Service_company;
};