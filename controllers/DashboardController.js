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

  async getArrivalAndDepartureTimeForEvent(req, res) {
    const { id } = req.params;

    if (typeof id === 'undefined' || isNaN(id)) {
      return res.status(400).json({ message: 'ID de evento no válido' });
    }

    try {
      const users = await EventUser.findAll({
        where: { event_id: id },
        attributes: ['user_id', 'arriveTime', 'leaveTime'],
      });

      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No se encontraron usuarios para este evento' });
      }

      const userTimes = {};
      users.forEach((user) => {
        userTimes[user.user_id] = {
          arriveTime: user.arriveTime,
          leaveTime: user.leaveTime,
        };
      });

      return res.status(200).json(userTimes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  },

};

module.exports = DashboardController;
