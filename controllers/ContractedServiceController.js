const ContractedService = require("../models/Contracted_service");

const ContractedServiceController = {
  async getAllContractedServices(req, res) {
    try {
      const getAllContractedServices = await ContractedService.findAll();
      res.status(200).send(getAllContractedServices);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hay un problema con el servidor", error });
    }
  },

  async getContractedServiceById(req, res) {
    try {
      const contractedService = await ContractedService.findByPk(req.params.id);

      if (!contractedService) {
        res.status(404).send({ message: "Servicio contratado no encontrado" });
      }

      res.status(200).send(contractedService);
    } catch (error) {
      res.status(500).send({
        message: "Hubo un problema con el servidor",
        error,
      });
    }
  },

  // NOTE: Mirar para vincular las tablas de service_id, event_id, service_company_id
  async createContractedService(req, res) {
    try {
      const contractedService = await ContractedService.create(...req.body);
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

      await ContractedService.update(contractedServiceUpdated, {
        where: { id: contractedServiceId },
      });

      if (!contractedServiceId) {
        res.status(404).send({ message: "Servicio contratado no encontrado" });
      }

      res
        .status(200)
        .send(
          { message: "Servicio contratado actualizado con éxito" },
          contractedServiceUpdated
        );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },

  async deleteContractedService(req, res) {
    try {
      const contractedService = await ContractedService.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!contractedService) {
        res.status(404).send({ message: "Servicio contratado no encontrado" });
      }

      res
        .status(204)
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
