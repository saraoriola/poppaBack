const { Contracted_service } = require("../models/index.js");

const ContractedServiceController = {
  async getAllContractedServices(req, res) {
    try {
      const getAllContractedServices = await Contracted_service.findAll();
      res.status(200).send(getAllContractedServices);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hay un problema con el servidor", error });
    }
  },
  async getContractedServiceById(req, res) {
    const { id } = req.params;
    try {
      const contractedService = await Contracted_service.findOne({
        where: { id: id },
      });

      if (!contractedService) {
        return res
          .status(404)
          .send({ message: "Servicio contratado no encontrado" });
      } else {
        return res.status(200).send(contractedService);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema con el servidor",
        error,
      });
    }
  },
  // NOTE: Mirar para vincular las tablas de service_id, event_id, service_company_id
  async createContractedService(req, res) {
    try {
      const contractedService = await Contracted_service.create(req.body);
      res
        .status(201)
        .send({ message: "Servicio contratado con éxito", contractedService });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },
  async updateContractedService(req, res) {
    try {
      const contractedServiceId = req.params.id;
      const contractedServiceUpdated = req.body;

      await Contracted_service.update(contractedServiceUpdated, {
        where: { id: contractedServiceId },
      });

      if (!contractedServiceId) {
        res.status(404).send({ message: "Servicio contratado no encontrado" });
      }

      res.status(200).send({
        message: "Servicio contratado actualizado con éxito",
        contractedServiceUpdated,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },
  async deleteContractedService(req, res) {
    try {
      const contractedService = await Contracted_service.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!contractedService) {
        res.status(404).send({ message: "Servicio contratado no encontrado" });
      }

      res
        .status(200)
        .send({ message: "Servicio contratado eliminado con éxito" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },
};

module.exports = ContractedServiceController;
