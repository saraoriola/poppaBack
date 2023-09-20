const express = require("express");
const { EventUser } = require("../models/index.js");

const EventUserController = {
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
