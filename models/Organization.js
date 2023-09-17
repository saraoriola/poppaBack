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
            name: DataTypes.STRING,
            web: DataTypes.STRING,
            email: DataTypes.STRING,
            tel: DataTypes.INTEGER,
            representative: DataTypes.STRING,
            patronage: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Organization",
            tableName: "organization", // HE VISTO QUE SI LA TABLA SE LLAMA CON NOMBRE DIFERENTE (MAYUS-MINUS) HAY QUE ESPECIFICAR CON TABLENAME
        }
    );
    return Organization;
};
