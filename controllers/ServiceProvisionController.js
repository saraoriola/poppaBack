const { Service_Provision } = require("../models/index.js"); //Esto estaba importado directamente desde la carpeta del modelo, debemos importar desde model index.
const { Op } = require("sequelize");

const ServiceProvisionController = {
  // NOTE: OKAY
  async getAllServices(req, res) {
    try {
      const getAllServices = await Service_Provision.findAll();
      res.status(200).send(getAllServices);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },

  // NOTE: OKAY
  async getServiceById(req, res) {
    try {
      const service = await Service_Provision.findByPk(req.params.id);

      if (!service) {
        res.status(404).send({ message: "Servicio no encontrado" });
      } else {
        res.status(200).send(service);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema con el servidor",
        error,
      });
    }
  },

  // NOTE: OKAY
  async getServiceByName(req, res) {
    try {
      const service = await Service_Provision.findAll({
        where: { name: { [Op.like]: `%${req.params.name}%` } },
      });

      if (service.length === 0 || !service) {
        res.status(404).send({ message: "Servicio no encontrado" });
      } else {
        res.status(200).send(service);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema con el servidor",
        error,
      });
    }
  },

  // NOTE: OKAY
  async createService(req, res) {
    try {
      const service = await Service_Provision.create(req.body);
      res.status(201).send({ message: "Servicio creado con éxito", service });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },

  // NOTE: OKAY
  async updateService(req, res) {
    try {
      const { id } = req.params;
      const serviceUpdated = await Service_Provision.findByPk(id);

      if (!serviceUpdated) {
        return res
          .status(404)
          .send({ message: "No se encontró ningún Servicio" });
      }

      await serviceUpdated.update(req.body);

      res.status(200).send({
        message: "Servicio actualizado con éxito",
        event: serviceUpdated,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al actualizar el servicio" });
    }
  },

  // NOTE: OKAY
  async deleteService(req, res) {
    try {
      const service = await Service_Provision.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!service) {
        res.status(404).send({ message: "Servicio no encontrado" });
      } else {
        res.status(200).send({ message: "Servicio eliminado con éxito" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },
};

module.exports = ServiceProvisionController;
