/* eslint-disable no-console */
const index = require("../index");
const qrCode = require("../utils/qrCode");
const { EventUser, User } = require("../models/index.js");

const EventUserController = {
    async getAllEventUsers(req, res) {
        try {
            const eventUsers = await EventUser.findAll();

            res.status(200).send({
                message: "Lista de usuarios que asisten a todos los eventos obtenida exitosamente",
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
                return res.status(404).send({ message: "No se han encontrado resultados" });
            } else {
                res.status(200).send({
                    message: "Lista de usuarios que asisten al evento obtenida exitosamente",
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

    async createEventUser(req, res) {
        try {
            const eventUserBody = {
                event_id: req.body.event_id,
                user_id: req.user.id,
                qrtoken: qrCode.generateRandomQrCode(),
            };

            const eventUser = await EventUser.create(eventUserBody);
            res.status(201).send({ message: "Usuario añadido al evento exitosamente", eventUser });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al crear el evento" });
        }
    },

    async updateEventUser(req, res) {
        try {
            const { id } = req.params;
            const eventUserUpdated = req.body;

            const eventUser = await EventUser.update(eventUserUpdated, {
                where: { id: id },
            });

            if (!eventUser) {
                return res.status(404).send({ message: "No se encontró ningún usuario en el evento" });
            }

            res.status(200).send({
                message: "Evento actualizado exitosamente",
                eventUserUpdated,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar el evento" });
        }
    },

    async deleteEventUser(req, res) {
        try {
            const { id } = req.params;

            const eventUser = await EventUser.destroy({
                where: { id: id },
            });

            if (!eventUser) {
                return res.status(404).send({ message: "No se encontró ningún usuario en el evento" });
            }

            res.status(200).send({
                message: "Evento eliminado exitosamente",
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Hubo un problema con el servidor" });
        }
    },

    async userCheckIn(req, res) {
        try {
            const qrtoken = req.body.qrtoken;
            let eventUser = await EventUser.findOne({ where: { qrtoken } });
            eventUser = await EventUser.update(
                { arriveTime: new Date() },
                {
                    where: { qrtoken },
                }
            );

            if (eventUser[0] === 1) {
                const eventUserData = await EventUser.findOne({
                    where: { qrtoken },
                    include: [{ model: User, as: "User" }],
                });
                index.broadcastMessage({ type: "CHECK-IN", payload: eventUserData });
                const msg = `Check-in satisfactorio para el QR token ${qrtoken}`;
                return res.send({ message: msg });
            } else if (eventUser[0] === 0) {
                return res.status(400).send({ message: `No existe el QR token ${qrtoken}` });
            } else {
                return res.status(400).send({ message: `No se pudo hacer check-in con el token ${qrtoken}` });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: "Ha habido un error en el servidor" });
        }
    },

    async userCheckOut(req, res) {
        try {
            const qrtoken = req.body.qrtoken;
            const eventUser = await EventUser.update(
                { leaveTime: new Date() },
                {
                    where: { qrtoken },
                }
            );

            if (eventUser[0] === 1) {
                const msg = `Check-out satisfactorio para el QR token ${qrtoken}`;
                index.broadcastMessage({ type: "CHECK-OUT", payload: msg });
                res.send({ message: msg });
            } else if (eventUser[0] === 0) {
                res.status(400).send({ message: `No existe el QR token ${qrtoken}` });
            } else {
                res.status(400).send({ message: `No se pudo hacer check-out con el token ${qrtoken}` });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error en el servidor" });
        }
    },

    async getQrCodeByEventUser(req, res) {
        try {
            const eventUsers = await EventUser.findAll({ where: { event_id: req.params.event_id, user_id: req.user.id } });
            res.send({ message: "QR code", code: eventUsers[0].qrtoken });
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

module.exports = EventUserController;
