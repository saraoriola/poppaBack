"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
        static associate(models) {
            Token.belongsTo(models.User, {
                foreignKey: "User_id",
                as: "user",
            });
        }
    }
    Token.init(
        {
            User_id: DataTypes.INTEGER,
            token: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Token",
        }
    );
    return Token;
};
