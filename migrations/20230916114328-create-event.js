"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Events", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            location_id: {
                type: Sequelize.INTEGER,
            },
            dateTime: {
                type: Sequelize.STRING,
            },
            duration_min: {
                type: Sequelize.INTEGER,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            banner: {
                type: Sequelize.STRING,
            },
            speacker: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Events");
    },
};
