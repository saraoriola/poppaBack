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
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            organization_id: DataTypes.INTEGER,
            surname: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tel: DataTypes.INTEGER,
            birthdate: DataTypes.INTEGER,
            avatar: DataTypes.STRING,
            confirmed: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "User",
            tableName: "Users",
        }
    );

    return User;
};
