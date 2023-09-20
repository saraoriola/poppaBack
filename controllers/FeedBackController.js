const { Feedback } = require("../models/index.js");
const express = require('express');
const router = express.Router();


const FeedbackController = {

  async createFeedBack(req, res) {
    try {
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
      const updateFeedBack = await Feedback.findByPk(req.params.id);
      await updateFeedBack.update(req.body);
      res.status(200).send({ message: "FeedBack actualizado exitosamente", updateFeedBack });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un problema al actualizar el feedback", error });
    }
  },
  async deleteFeedBack(req, res) {
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

}
module.exports = FeedbackController;