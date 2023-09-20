const express = require("express");
const { EventUser } = require("../models/index.js");

const EventUserController = {
  async getAllEventUsers(req, res) {
    try {
      const eventUsers = await EventUser.findAll();

      res.status(200).send({
        message:
          "Lista de usuarios que asisten a todos los eventos obtenida exitosamente",
        eventUsers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema con el servidor",
      });
    }
  },

  async getAllEventUsersByEvent(req, res) {
    try {
      const { id } = req.params;

      const eventUsers = await EventUser.findAll({ where: { event_id: id } });

      if (!eventUsers || eventUsers.length === 0) {
        return res
          .status(404)
          .send({ message: "No se han encontrado resultados" });
      } else {
        res.status(200).send({
          message:
            "Lista de usuarios que asisten al evento obtenida exitosamente",
          eventUsers,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema con el servidor",
      });
    }
  },

  //NOTE: Esto será automático con el QR supongo. De momento lo dejo así.
  //NOTE: Falta traerme el event_id. Se seleccionará manualmente supongo. De momento lo dejo para pasarlo por body a pelo.
  async createEventUser(req, res) {
    try {
      const user = req.body;
      const eventUserBody = {
        ...user,
        user_id: req.user.id,
      };

      const eventUser = await EventUser.create(eventUserBody);

      res
        .status(201)
        .send({ message: "Evento creado exitosamente", eventUser });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el evento" });
    }
  },
};

module.exports = EventUserController;
