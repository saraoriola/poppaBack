const { EventUser } = require("../models/index.js");

const DashboardController = {
  async getEventById(req, res) {
    const { id } = req.params;

    try {
      const event = await EventUser.findAll({
        where: { event_id: id },
      });

      if (!event) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }

      return res.status(200).json(event);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  },

  async getUserById(req, res) {
    const { id} = req.params;

    if (typeof id === 'undefined' || isNaN(id)) {
      return res.status(400).json({ message: 'ID de usuario no válido' });
    }

    try {
      const user = await EventUser.findAll({
        where: { user_id: id },
      });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  },
};

module.exports = DashboardController;
