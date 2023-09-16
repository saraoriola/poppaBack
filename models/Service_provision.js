"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Service_Provision extends Model {
        static associate(models) {
            Service_Provision.belongsToMany(models.Event, {
                through: models.Contracted_service,
                foreignKey: "service_id",
                as: "events",
            });
        }
    }

    Service_Provision.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Service_Provision",
        }
    );

    return Service_Provision;
};
