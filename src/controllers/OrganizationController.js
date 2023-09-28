const { Op } = require("sequelize");
const { Organization } = require("../models/index");

const OrganizationController = {
  async getAll(req, res) {
    try {
      const getAllOrganizations = await Organization.findAll();
      res.status(200).send(getAllOrganizations);
    } catch (error) {
      console.error(error);
    }
  },
  async getAllSortBySector(req, res) {
    try {
      const getAllOrganizations = await Organization.findAll({
        order: [["sector", "DESC"]],
      });
      res.status(200).send(getAllOrganizations);
    } catch (error) {
      console.error(error);
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const organization = await Organization.findByPk(id);
      if (!organization) {
        return res.status(404).send({ message: "No se ha encontrado la organización" });
      } else {
        return res.status(200).send({message: "Organización obtenida con éxito",organization,});
      }
    } catch (error) {
      res.status(500).send({message: "Hubo un problema con el servidor",error,});
    }
  },
  async getOrganizationByName(req, res) {
    try {
      const organization = await Organization.findAll({
        where: { name: { [Op.like]: `%${req.params.name}%` } },
      });
      if (!organization || organization.length === 0) {
        res.status(404).send({message: "No se han encontrado resultados",});
      } else {
        res.status(200).send({message: "Organizaciones obtenidas con éxito",organization,});
      }
    } catch (error) {
      res.status(500).send({message: "Ocurrió un error al intentar encontrar el usuario",error,});
    }
  },
  async getOrganizationBySector(req, res) {
    try {
      const organization = await Organization.findAll({
        where: { sector: { [Op.like]: `%${req.params.sector}%` } },
      });
      if (!organization || organization.length === 0) {
        res.status(404).send({
          message: "No se han encontrado resultados",
        });
      } else {
        res.status(200).send({
          message: "Organizaciones obtenidas con éxito",
          organization,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error al intentar encontrar el usuario",
        error,
      });
    }
  },
  async createOrganization(req, res) {
    try {
      const organization = await Organization.create(req.body);
      res.status(201).send({ message: "Organización creada exitosamente", organization });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un problema al crear la organización" });
    }
  },
  async updateOrganization(req, res) {
    try {
      const { id } = req.params;
      const updatedOrganization = await Organization.findByPk(id); 
      if (!updatedOrganization) {
        return res.status(404).send({
          message: "No se encontró ninguna organización para actualizar",
        });
      }
      await updatedOrganization.update(req.body);
      res.status(200).send({message: "Organización actualizada exitosamente",
        organization: updatedOrganization,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al actualizar la organización",
      });
    }
  },
  async deleteOrganization(req, res) {
    try {
      const { id } = req.params;
      const organization = await Organization.destroy({
        where: { id: id },
      });
      if (!organization) {
        return res.status(404).send({ message: "No se encontró ninguna organización" });
      }
      res.status(200).send({message: "Organización eliminada exitosamente",});
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hubo un problema con el servidor" });
    }
  },
};

module.exports = OrganizationController;
