"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsToMany(models.Event, {
                through: models.EventUser,
                foreignKey: "user_id",
                as: "events",
            });

            User.hasOne(models.Role, {
                foreignKey: "User_id",
                as: "role",
            });

            User.belongsTo(models.Organization, {
                foreignKey: "organization_id",
                as: "organization",
            });

            User.hasMany(models.Token, {
                foreignKey: "User_id",
                as: "tokens",
            });
        }
    }

    User.init(
        {
            name: DataTypes.STRING,
            organization_id: DataTypes.INTEGER,
            surname: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            tel: DataTypes.INTEGER,
            birthdate: DataTypes.INTEGER,
            avatar: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    return User;
};
