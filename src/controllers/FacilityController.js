const { Op } = require("sequelize");
const { Facilities } = require("../models/index.js");

const FacilityController = {
  async getAllFacilities(req, res) {
    try {
      const getAllFacilities = await Facilities.findAll();
      res.status(200).send(getAllFacilities);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hay un problema con el servidor", error });
    }
  },
  async getFacilityById(req, res) {
    const { id } = req.params;
    try {
      const facility = await Facilities.findOne({
        where: { id: id },
      });

      if (!facility) {
        return res.status(404).send({ message: "Instalación no encontrada" });
      } else {
        return res.status(200).send(facility);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema con el servidor",
        error,
      });
    }
  },

  async getFacilitiesByName(req, res) {
    try {
      const { name } = req.params;
      const facilities = await Facilities.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
      });

      if (!facilities || facilities.length === 0) {
        return res.status(404).send({ message: "No se ha encontrado la instalación" });
      } else {
        return res.status(200).send({message: "Instalaciones obtenidas con éxito",facilities,});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hubo un problema con el servidor", error });
    }
  },
  async getFacilitiesByAddress(req, res) {
    try {
      const { address } = req.params;
      const facilities = await Facilities.findAll({
        where: { address: { [Op.like]: `%${address}%` } },
      });
      if (!facilities || facilities.length === 0) {
        return res.status(404).send({ message: "No se ha encontrado la instalación" });
      } else {
        return res.status(200).send({message: "Instalaciones obtenidas con éxito",facilities,});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hubo un problema con el servidor", error });
    }
  },
  async createFacility(req, res) {
    try {
      const facility = await Facilities.create(req.body);
      res.status(201).send({
        message: "Instalación creada con éxito",
        facility,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({message: "Hubo un problema con el servidor",error,
      });
    }
  },

  async updateFacility(req, res) {
    try {
      const { id } = req.params;
      const updatedFacility = await Facilities.findByPk(id);
      if (!updatedFacility) {
        return res.status(404).send({message: "No se encontró ninguna instalación para actualizar",
        });
      }
      await updatedFacility.update(req.body);
      res.status(200).send({message: "Instalación actualizada exitosamente",updatedFacility,});
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hubo un problema con el servidor" });
    }
  },
  async deleteFacility(req, res) {
    try {
      const { id } = req.params;
      const deletedFacility = await Facilities.findByPk(id);
      if (!deletedFacility) {
        return res
          .status(404).send({message: "No se encontró ninguna instalación para eliminar",});
      }
      await deletedFacility.destroy();
      res.status(200).send({ message: "Instalación eliminada exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hubo un problema con el servidor" });
    }
  },
};

module.exports = FacilityController;
