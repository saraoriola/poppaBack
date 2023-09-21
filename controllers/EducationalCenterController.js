const { EducationalCenter } = require("../models/index.js");
const express = require("express");
const router = express.Router();


const EducationalCenterController = {

    async create(req, res) {
        try {
            // NOTE: La type_id se genera automaticamente ? 
            const educational = await EducationalCenter.create(req.body);
            res.status(201).send({ message: "Educational center creado exitosamente", educational });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al crear el educational center ", error });
        }
    }


}

module.exports = EducationalCenterController;