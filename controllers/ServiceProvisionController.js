const { Service_Provision } = require("../models/index.js"); //Esto estaba importado directamente desde la carpeta del modelo, debemos importar desde model index.

const ServiceProvisionController = {
    async createService(req, res) {
        try {
            const service = await Service_Provision.create(req.body); //Había un problema con el nombre en el modelo (TableName) debe estar exactamente igual
            res.status(201).send({ message: "Servicio creado", service });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Hay un problema con el servidor" });
        }
    },
};

module.exports = ServiceProvisionController;
