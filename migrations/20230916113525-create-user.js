"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            organization_id: {
                type: Sequelize.INTEGER,
            },
            surname: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            tel: {
                type: Sequelize.INTEGER,
            },
            birthdate: {
                type: Sequelize.DATE,
            },
            avatar: {
                type: Sequelize.STRING,
            },
            confirmed: {
                type: Sequelize.BOOLEAN,
            },
            file: {
                type: Sequelize.STRING,
            },
            course: {
                type: Sequelize.STRING,
            },
            country: {
                type: Sequelize.STRING,
            },
            interest: {
                type: Sequelize.STRING,
            },
            gender: {
                type: Sequelize.STRING,
            },
            catchment: {
                type: Sequelize.STRING,
            },
            career: {
                type: Sequelize.STRING,
            },
            responsability: {
                type: Sequelize.STRING,
            },
            area: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("Users");
    },
};
