const { Facilities } = require("../models/index.js");

// NOTE: Address -> adress
const FacilityController = {
  async createFacility(req, res) {
    try {
      const facility = await Facilities.create(req.body);
      res.status(201).send({
        message: "Instalación creada con éxito",
        facility,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema con el servidor",
        error,
      });
    }
  },
};

module.exports = FacilityController;
