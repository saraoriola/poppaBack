const { Event, User } = require("../models/index.js");

const DashboardController = {
  async getEventById(req, res) {
    try {
      const { id } = req.params;

      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(404).send({ message: "Evento no encontrado en el dashboard" });
      } else {
        res.status(200).send({
          message: "Detalles del evento obtenidos exitosamente en el dashboard",
          event,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al obtener los detalles del evento en el dashboard",
      });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).send({ message: "Evento no encontrado en el dashboard" });
      } else {
        res.status(200).send({
          message: "Detalles del evento obtenidos exitosamente en el dashboard",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al obtener los detalles del evento en el dashboard",
      });
    }
  },
};

module.exports = DashboardController;
