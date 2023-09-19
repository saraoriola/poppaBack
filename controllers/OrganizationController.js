const { Organization } = require("../models/index");

const OrganizationController = {
  //NOTE: OKAY
  async createOrganization(req, res) {
    try {
      const organization = await Organization.create(req.body);

      res
        .status(201)
        .send({ message: "Organización creada exitosamente", organization });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear la organización" });
    }
  },

  //NOTE: OKAY
  async updateOrganization(req, res) {
    try {
      const { id } = req.params;

      const updatedOrganization = await Organization.findByPk(id); // ERROR SALTA AQUÍ

      if (!updatedOrganization) {
        return res.status(404).send({
          message: "No se encontró ninguna organización para actualizar",
        });
      }

      await updatedOrganization.update(req.body);

      res.status(200).send({
        message: "Organización actualizada exitosamente",
        organization: updatedOrganization,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al actualizar la organización",
      });
    }
  },
};

module.exports = OrganizationController;
