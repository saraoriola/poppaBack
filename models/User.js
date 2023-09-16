'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class USER extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  USER.init({
    name: DataTypes.STRING,
    organization_id: DataTypes.NUMBER,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tel: DataTypes.NUMBER,
    birthdate: DataTypes.NUMBER,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'USER',
  });
  return USER;
};