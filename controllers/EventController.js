const { Op } = require("sequelize");
const { Event } = require("../models/index.js");

const EventController = {
  async getAllEvents(req, res) {
    try {
      const events = await Event.findAll();

      res
        .status(200)
        .send({ message: "Lista de eventos obtenida exitosamente", events });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al obtener la lista de eventos",
      });
    }
  },

  async getEventById(req, res) {
    try {
      const { id } = req.params;

      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(404).send({ message: "Evento no encontrado" });
      }

      res
        .status(200)
        .send({ message: "Detalles del evento obtenidos exitosamente", event });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al obtener los detalles del evento",
      });
    }
  },

  async getEventByLocationId(req, res) {
    try {
      const { id } = req.params;
      const event = await Event.findAll({ where: { location_id: id } });

      if (!event) {
        return res
          .status(404)
          .send({ message: "No se han encontrado los eventos" });
      } else {
        return res.status(200).send({
          message: "Eventos obtenidos con éxito",
          event,
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },

  async getEventByType(req, res) {
    try {
      const { type } = req.params;

      const event = await Event.findAll({
        where: { type: { [Op.like]: `%${type}%` } },
      });

      if (!event || event.length === 0) {
        return res
          .status(404)
          .send({ message: "No se ha encontrado el evento" });
      } else {
        return res.status(200).send({
          message: "Eventos obtenidos con éxito",
          event,
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },

  async getEventByTitle(req, res) {
    try {
      const { title } = req.params;

      const event = await Event.findAll({
        where: { title: { [Op.like]: `%${title}%` } },
      });

      if (!event || event.length === 0) {
        return res
          .status(404)
          .send({ message: "No se ha encontrado el evento" });
      } else {
        return res.status(200).send({
          message: "Eventos obtenidos con éxito",
          event,
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },

  async getByDateAsc(req, res) {
    try {
      const sortEvents = await Event.findAll({ order: [["dateTime", "ASC"]] });

      res.status(200).send({
        message: "Lista de eventos obtenida exitosamente",
        sortEvents,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },

  async getByDateDesc(req, res) {
    try {
      const sortEvents = await Event.findAll({ order: [["dateTime", "DESC"]] });

      res.status(200).send({
        message: "Lista de eventos obtenida exitosamente",
        sortEvents,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },

  async getByDurationAsc(req, res) {
    try {
      const sortEvents = await Event.findAll({
        order: [["duration_min", "ASC"]],
      });

      res.status(200).send({
        message: "Lista de eventos obtenida exitosamente",
        sortEvents,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },

  async getByDurationDesc(req, res) {
    try {
      const sortEvents = await Event.findAll({
        order: [["duration_min", "DESC"]],
      });

      res.status(200).send({
        message: "Lista de eventos obtenida exitosamente",
        sortEvents,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hubo un problema con el servidor", error });
    }
  },

  async createEvent(req, res) {
    try {
      // NOTE: La location_id se la metes a pelo.
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
      const { id } = req.params;
      const updatedEvent = await Event.findByPk(id);

      if (!updatedEvent) {
        return res
          .status(404)
          .send({ message: "No se encontró ningún evento para actualizar" });
      }

      await updatedEvent.update(req.body);

      res.status(200).send({
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

  async deleteEvent(req, res) {
    try {
      const { id } = req.params;

      await Event.destroy({ where: { id: id } });

      if (!id) {
        return res
          .status(404)
          .send({ message: "No se encontró ningún evento para eliminar" });
      }

      res.status(200).send({ message: "Evento eliminado exitosamente" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al eliminar el evento" });
    }
  },
};

module.exports = EventController;
