const { Type, Sequelize } = require("../models/index.js");
const { Op } = Sequelize;

const TypeController = {

    async create(req, res) {
        try {
            // NOTE: La organization_id se la metes a pelo ?
            const type = await Type.create(req.body);
            res.status(201).send({ message: "Type creado exitosamente", type });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al crear el type" });
        }
    },
    async getById(req, res) {
        try {
            const type = await Type.findByPk(req.params.id)
            if (type) {
                res.send({ message: "¡Estes son los types que tenemos", type })
            } else {
                res.status(404).send({ message: "¡No! lo encontraste el type!", type })
            }
        } catch (error) {
            res.status(500).send({ message: "Lo sentimos, ¡Ha pasado algo, no se puede encontrar el type", error })
        }
    },
    async getAll(req, res) {
        try {
            const type = await Type.findAll();
            res.status(200).send({ message: "¡Usted estas viendo todos los types que tenemos!", type })
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Lo sentimos, ¡Ha pasado algo, no se puede encontrar los types", error })
        }
    },
    async getTypeByName(req, res) {
        try {
            const typeName = req.params.name; 
            const type = await Type.findOne({
                where: { name: { [Op.like]: `%${typeName}%` }},
            });
            if (type) {
            res.send({ message: "Usted estas viendo el type por nombre", type })
        } else {
            res.status(404).send({ message: "¡Lo siento! ¡No se encontró ningún type con este nombre!", type: type });
          }
        } catch (error) {
            res.status(500).send({ message: "Ocurrió un error al intentar encontrar el tipo", error});
        }
    },
    async updateType(req, res) {
        try {
            const updateType = await Type.findByPk(req.params.id);
            await updateType.update(req.body);
            res.status(200).send({ message: "Type actualizado exitosamente", updateType });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar el type", error });
        }
    },
    async deleteTypeById(req, res) {
        try {
            const type = await Type.destroy({
                where: { id: req.params.id }
            });
            if (type) {
                res.send({ message: "Type borrado con éxito" })
            } else {
                res.status(404).send({ message: "Type no encontrado!" })
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error de servidor", error })
        }
    }
    
}


module.exports = TypeController;


