'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contracted_service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contracted_service.init({
    service_id: DataTypes.NUMBER,
    event_id: DataTypes.NUMBER,
    cost: DataTypes.DECIMAL,
    paid: DataTypes.DECIMAL,
    service_company_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Contracted_service',
  });
  return Contracted_service;
};