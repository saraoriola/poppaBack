/* eslint-disable no-console */
const index = require("../index");
const qrCode = require("../utils/qrCode");
const { EventUser } = require("../models/index.js");

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

    //NOTE: Esto será automático con el QR supongo. De momento lo dejo así.
    //NOTE: Falta traerme el event_id. Se seleccionará manualmente supongo. De momento lo dejo para pasarlo por body a pelo.
    async createEventUser(req, res) {
        try {
            // Aquí hay que generar el código QR y almacenarlo en la columna "qrtoken".
            // Usar la siguiente línea de código:
            console.log(qrCode.generateRandomQrCode());

            const user = req.body;
            const eventUserBody = {
                ...user,
                user_id: req.user.id,
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
            const eventUser = await EventUser.update(
                { arriveTime: new Date() },
                {
                    where: { qrtoken },
                }
            );

            if (eventUser[0] === 1) {
                const msg = `Check-in satisfactorio para el QR token ${qrtoken}`;
                index.broadcastMessage({ type: "CHECK-IN", payload: msg });
                res.send({ message: msg });
            } else if (eventUser[0] === 0) {
                res.status(400).send({ message: `No existe el QR token ${qrtoken}` });
            } else {
                res.status(400).send({ message: `No se pudo hacer check-in con el token ${qrtoken}` });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error en el servidor" });
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
};

module.exports = EventUserController;