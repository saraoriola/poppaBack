const { Service_Provision } = require("../models/index.js");

const { Op } = require("sequelize");

const ServiceProvisionController = {
    async getAllServices(req, res) {
        try {
            const getAllServices = await Service_Provision.findAll();
            res.status(200).send(getAllServices);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Hubo un problema con el servidor", error });
        }
    },

    async getServiceById(req, res) {
        try {
            const service = await Service_Provision.findByPk(req.params.id);

            if (!service) {
                res.status(404).send({ message: "Servicio no encontrado" });
            }

            res.status(200).send(service);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "Hubo un problema con el servidor",
                error,
            });
        }
    },

    async getServiceByName(req, res) {
        try {
            const service = await Service_Provision.findAll({
                where: { name: { [Op.like]: `%${req.params.name}%` } },
            });

            if (!service) {
                res.status(404).send({ message: "Servicio no encontrado" });
            }

            res.status(200).send(service);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "Hubo un problema con el servidor",
                error,
            });
        }
    },

    async createService(req, res) {
        try {
            const service = await Service_Provision.create(req.body);
            res.status(201).send({ message: "Servicio creado con éxito", service });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Hubo un problema con el servidor", error });
        }
    },

    async updateService(req, res) {
        try {
            const serviceId = req.params.id;
            const serviceUpdated = req.body;

            await Service_Provision.update(serviceUpdated, {
                where: { id: serviceId },
            });

            if (!serviceId) {
                res.status(404).send({ message: "Servicio no encontrado" });
            }

            res.status(200).send({ message: "Servicio actualizado con éxito" }, serviceUpdated);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Hubo un problema con el servidor", error });
        }
    },

    async deleteService(req, res) {
        try {
            const service = await Service_Provision.destroy({
                where: {
                    id: req.params.id,
                },
            });

            if (!service) {
                res.status(404).send({ message: "Servicio no encontrado" });
            }

            res.status(204).send({ message: "Servicio eliminado con éxito" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Hubo un problema con el servidor", error });
        }
    },
};

module.exports = ServiceProvisionController;
