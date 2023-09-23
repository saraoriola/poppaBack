"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Type extends Model {
        static associate(models) {
            Type.belongsTo(models.Organization, {
                foreignKey: "organization_id",
                as: "organization",
            });
        }
    }
    Type.init(
        {
            organization_id: DataTypes.INTEGER,
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Type",
            tableName: "Types",
        }
    );
    return Type;
};
