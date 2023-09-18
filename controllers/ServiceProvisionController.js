const ServiceProvision = require("../models/Service_provision");

const ServiceProvisionController = {
  async createService(req, res) {
    try {
      const service = await ServiceProvision.create(req.body);
      res.status(201).send({ message: "Servicio creado", service });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hay un problema con el servidor" });
    }
  },
};

module.exports = ServiceProvisionController;
