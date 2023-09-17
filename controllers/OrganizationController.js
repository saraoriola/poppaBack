const Organization = require("../models/Organization");

const OrganizationController = {
    async createOrganization(req, res) {
        try {
            const { name, web, email, tel, representative } = req.body;

            if (!name || !web || !email || !tel || !representative) {
                return res.status(400).send({ message: "Debes completar todos los campos" });
            }

            const organization = await Organization.create(req.body);

            res.status(201).send({ message: "Organización creada exitosamente", organization });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al crear la organización" });
        }
    },

    async updateOrganization(req, res) {
        try {
            const { organizationId } = req.params;

            const updatedOrganization = await Organization.findByPk(organizationId); // ERROR SALTA AQUÍ

            if (!updatedOrganization) {
                return res.status(404).send({ message: "No se encontró ninguna organización para actualizar" });
            }

            await updatedOrganization.update(req.body);

            res.status(200).send({ message: "Organización actualizada exitosamente", organization: updatedOrganization });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al actualizar la organización" });
        }
    },
};

module.exports = OrganizationController;
