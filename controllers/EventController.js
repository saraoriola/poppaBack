const Event = require("../models/Event");

const EventController = {
  async create(req, res) {
    try {
      const {
        location_id,
        dateTime,
        duration_min,
        type,
        banner,
        description,
        title,
      } = req.body;

      if (
        !location_id ||
        !dateTime ||
        !duration_min ||
        !type ||
        !banner ||
        !description ||
        !title
      ) {
        return res
          .status(400)
          .send({ message: "Debes completar todos los campos" });
      }

      const event = await Event.create(req.body);

      res.status(201).send({ message: "Evento creado exitosamente", event });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el evento" });
    }
  },

  async updateEvent(req, res) {
    try {
      const { eventId } = req.params;

      const updatedEvent = await Event.findByPk(eventId);

      if (!updatedEvent) {
        return res
          .status(404)
          .send({ message: "No se encontró ningún evento para actualizar" });
      }

      await updatedEvent.update(req.body);

      res
        .status(200)
        .send({
          message: "Evento actualizado exitosamente",
          event: updatedEvent,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al actualizar el evento" });
    }
  },

    async getAllEvents(req, res) {
        try {
            const events = await Event.findAll();

      res
        .status(200)
        .send({ message: "Lista de eventos obtenida exitosamente", events });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          message: "Ha habido un problema al obtener la lista de eventos",
        });
    }
  },

  async getEventById(req, res) {
    try {
      const { eventId } = req.params;

      const event = await Event.findByPk(eventId);

      if (!event) {
        return res.status(404).send({ message: "Evento no encontrado" });
      }

            res.status(200).send({ message: "Detalles del evento obtenidos exitosamente", event });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al obtener los detalles del evento" });
        }
    },
    async deleteEvent(req, res) {
        try {
            const { eventId } = req.params;

            const deletedEvent = await Event.findByPk(eventId);

            if (!deletedEvent) {
                return res.status(404).send({ message: "No se encontró ningún evento para eliminar" });
            }

            await deletedEvent.destroy();

            res.status(200).send({ message: "Evento eliminado exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al eliminar el evento" });
        }
    },
};

module.exports = EventController;
