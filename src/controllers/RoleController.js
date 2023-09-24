const express = require("express");
const { Role } = require("../models/index.js");

const RoleController = {
  async updateToAdmin(req, res) {
    try {
      const { id } = req.params;

      await Role.update({ type: "admin" }, { where: { User_id: id } });

      if (!id) {
        res.status(404).send({ message: "Usuario no encontrado" });
      } else {
        res.status(200).send({
          message: "Este usuario ahora es admin",
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Hay un problema con el servidor", error });
    }
  },
};

module.exports = RoleController;
