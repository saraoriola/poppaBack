const { EducationalCenter } = require("../models/index.js");
const express = require("express");
const router = express.Router();


const EducationalCenterController = {

    async create(req, res) {
        try {
            const educational = await EducationalCenter.create(req.body);
            res.status(201).send({ message: "Educational center creado exitosamente", educational });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al crear el educational center ", error });
        }
    },
    async getById(req, res) {
        try {
            const educational = await EducationalCenter.findByPk(req.params.id);
            if (!educational) {
                return res.status(404).send({ message: "Educational center no encontrado" });
            } else {
                res.status(200).send({ message: "Detalles del educational center obtenidos exitosamente", educational });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al obtener los detalles del educational center", error });
        }
    },
    async getAllEducationalCenter(req, res) {
        try {
          const educational = await EducationalCenter.findAll();
          res.status(200).send({ message: "Lista de educational centers obtenida exitosamente", educational });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un problema al obtener la lista de educational centers", error });
        }
      },
    async updateEducationalCenter(req, res) {
        try {
            const updateEducationalCenter = await EducationalCenter.findByPk(req.params.id);
            if (!updateEducationalCenter) {
                return res.status(404).send({ message: "No se encontró ningúno educational center para actualizar" });
            }
            await updateEducationalCenter.update(req.body);
            res.status(200).send({ message: "Educational center actualizado exitosamente", updateEducationalCenter });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar el educational center", error });
        }
    },
    async deleteEducationalCenter(req, res) {
        try {
          const educational = await EducationalCenter.destroy({
            where: { id: req.params.id },
          });
          if (educational) {
            res.send({ message: "Educational Center borrado con éxito" });
          } else {
            res.status(404).send({ message: "Educational center no encontrada!", educational });
          }
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Error de servidor", error });
        }
      }

}

module.exports = EducationalCenterController;