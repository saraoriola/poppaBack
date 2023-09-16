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
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Type",
        }
    );
    return Type;
};
