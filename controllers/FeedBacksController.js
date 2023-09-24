const { Feedback } = require("../models/index.js");
const express = require("express");
const router = express.Router();

const FeedBacksController = {
    async createFeedBack(req, res) {
        try {
            const valoration = req.body.valoration;
            if (!Number.isInteger(valoration) || valoration < 1 || valoration > 5) {
                return res.status(400).send({ message: "Valoration debe ser un número entre 1 y 5" });
            }
            const feedback = await Feedback.create(req.body);
            res.status(201).send({ message: "Feedback creado exitosamente", feedback });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al crear el feedback", error });
        }
    },
    async getAllFeedBack(req, res) {
        try {
            const feedback = await Feedback.findAll();
            res.status(200).send({ message: "Lista de feedback obtenida exitosamente", feedback });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al obtener la lista de feedback", error });
        }
    },
    async getFeedBackById(req, res) {
        try {
            const feedback = await Feedback.findByPk(req.params.id);
            if (!feedback) {
                return res.status(404).send({ message: "Feedback no encontrado" });
            } else {
                res.status(200).send({ message: "Detalles del feedback obtenidos exitosamente", feedback });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al obtener los detalles del feedback", error });
        }
    },
    async updateFeedBack(req, res) {
        try {
            const valoration = req.body.valoration;
            if (!Number.isInteger(valoration) || valoration < 1 || valoration > 5) {
                return res.status(400).send({ message: "Valoration debe ser un número entre 1 y 5" });
            }
            const updateFeedBack = await Feedback.findByPk(req.params.id);
            await updateFeedBack.update(req.body);
            res.status(200).send({ message: "FeedBack actualizado exitosamente", updateFeedBack });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar el feedback", error });
        }
    },
    async getInDesc(req, res) {
        try {
            const feedback = await Feedback.findAll({
                order: [["valoration", "DESC"]],
            });
            res.status(200).send({ message: "Estas mirando los feedback's valoration en orden decreciente", feedback: feedback });
        } catch (error) {
            console.error("Intente novamente", error);
            res.status(500).send("No encontramos nada, lo siento!");
        }
    },
    async getInAsc(req, res) {
        try {
            const feedback = await Feedback.findAll({
                order: [["valoration", "ASC"]],
            });
            res.status(200).send({ message: "Estas mirando los feedback's valoration en orden creciente", feedback: feedback });
        } catch (error) {
            console.error("Intente novamente", error);
            res.status(500).send("No encontramos nada, lo siento!");
        }
    },
    async createValoration(req, res) {
        try {
            const valoration = req.body.valoration;
            if (!Number.isInteger(valoration) || valoration < 1 || valoration > 5) {
                return res.status(400).send({ message: "Valoration debe ser un número entre 1 y 5" });
            }
            const feedback = await Feedback.create({ valoration });
            res.status(201).send({ message: "Valoration creada", feedback });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error actualizando la valoración" });
        }
    },
    async updateValoration(req, res) {
        try {
            const valoration = req.params.id;
            const existingValoration = await Feedback.findByPk(valoration);
            if (!existingValoration) {
                return res.status(404).send({ message: "Valoration no encontrada" });
            }
            const newValoration = req.body.valoration;
            if (!Number.isInteger(newValoration) || newValoration < 1 || newValoration > 5) {
                return res.status(400).send({ message: "Valoration debe ser un número entre 1 y 5" });
            }
            existingValoration.valoration = newValoration;
            await existingValoration.save();
            res.status(200).send({ message: "Valoration actualizada", valoration: existingValoration });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error actualizando la valoración" });
        }
    },
    async deleteValoration(req, res) {
        try {
            const valoration = req.params.id;
            const existingValoration = await Feedback.findByPk(valoration);
            if (!existingValoration) {
                return res.status(404).send({ message: "Valoration no encontrada" });
            }
            await existingValoration.update({ valoration: 0 });
            res.status(200).send({ message: "Valoration eliminada" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error eliminando la valoración" });
        }
    },
    async deleteFeedBackById(req, res) {
        try {
            const feedback = await Feedback.destroy({
                where: {
                    id: req.params.id,
                },
            });
            if (feedback) {
                res.send({ message: "FeedBack borrado con éxito!" });
            } else {
                res.status(404).send({ message: "FeedBack no encontrado." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error de servidor.", error });
        }
    },
    async deleteAllFeedbacks(req, res) {
        try {
            await Feedback.destroy({ where: {}, truncate: true });
            res.status(200).send({ message: "Todos los Feedbacks han sido borrados con éxito." });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error de servidor.", error });
        }
    },
};
module.exports = FeedBacksController;
