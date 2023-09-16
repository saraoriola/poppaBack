"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Service_company extends Model {
        static associate(models) {
            Service_company.hasMany(models.Contracted_service, {
                foreignKey: "service_company_id",
                as: "contracted_services",
            });
        }
    }

    Service_company.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            tel: DataTypes.INTEGER,
            speciality: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Service_company",
        }
    );

    return Service_company;
};
