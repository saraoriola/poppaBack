const { Location } = require("../models/index.js");

const LocationController = {
  async getLocationsDesc(req, res) {
    try {
      const location = await Location.findAll({
        order: [["capacity", "DESC"]],
      });
      res.status(200).send({
        message: "Eventos en orden decreciente por capacidad (personas)",
        location: location,
      });
    } catch (error) {
      console.error("Intente novamente", error);
      res.status(500).send("No encontramos nada, lo siento!");
    }
  },
  async getLocationsAsc(req, res) {
    try {
      const location = await Location.findAll({
        order: [["capacity", "ASC"]],
      });
      res.status(200).send({
        message: "Eventos en orden creciente por capacidad (personas)",
        location: location,
      });
    } catch (error) {
      console.error("Intente novamente", error);
      res.status(500).send("No encontramos nada, lo siento!");
    }
  },
  async getById(req, res) {
    try {
      const location = await Location.findByPk(req.params.id);
      if (location) {
        res.send(location);
      } else {
        res.status(404).send({ message: "¡No! lo encontraste el evento!", location });
      }
    } catch (error) {
      res.status(500).send({ message: "Lo sentimos, ¡No encontramos este evento!", error });
    }
  },
  async getByCapacity(req, res) {
    try {
      const capacity = req.params.capacity;
      const location = await Location.findOne({
        where: { capacity: capacity },
      });
      if (location) {
        res.send({
          message: "Encontrates el evento que estas buscando",
          location: location,
        });
      } else {
        res.status(404).send({
          message: `No encontramos ninguno evento con la capacidad para ${capacity} personas.`,
          location: location,
        });
      }
    } catch (error) {
      res.status(500).send({ message: "Ocurrió un error al buscar por capacidad.", error });
    }
  },
  async createLocation(req, res) {
    try {
      const location = await Location.create(req.body);
      res.send({ message: "¡Enhorabuena!¡ Tu creaste un evento!", location });
    } catch (error) {
      res.status(500).send({ message: "Perdona, evento no creado.", error });
    }
  },
  async updateLocation(req, res) {
    try {
      const updateLocation = await Location.findByPk(req.params.id);
      await updateLocation.update(req.body);
      res.status(200).send({message: "Ubicacion actualizado exitosamente",updateLocation,});
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un problema al actualizar la ubicacion",error,
      });
    }
  },
  async deleteLocation(req, res) {
    try {
      const location = await Location.destroy({
        where: { id: req.params.id },
      });
      if (location) {
        res.send({ message: "Ubicacion borrada con éxito" });
      } else {
        res.status(404).send({ message: "Ubicacion no encontrada!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error de servidor", error });
    }
  },
};

module.exports = LocationController;
