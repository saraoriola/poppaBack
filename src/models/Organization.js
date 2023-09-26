"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Organization extends Model {
        static associate(models) {
            Organization.hasMany(models.User, {
                foreignKey: "organization_id",
                as: "users",
            });

            Organization.hasOne(models.Type, {
                foreignKey: "organization_id",
                as: "type",
            });
        }
    }
    Organization.init(
        {
            type_id: DataTypes.INTEGER,
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            web: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            tel: DataTypes.INTEGER,
            position: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sector: DataTypes.STRING,
        },

        {
            sequelize,
            modelName: "Organization",
            tableName: "Organizations", 
        }
    );
    return Organization;
};
