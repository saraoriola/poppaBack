require("dotenv").config();
const { User, Token, Sequelize, Role } = require("../models");
const { Op } = Sequelize;
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const { jwt_secret } = require("../config/config.js")[env];

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret);
        const user = await User.findByPk(payload.id);

        const tokenFound = await Token.findOne({
            where: {
                [Op.and]: [{ User_id: user.id }, { token: token }],
            },
        });
        if (!tokenFound) {
            return res.status(401).send({ message: "No estás autorizado" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({ error, message: "Ha habido un problema con el token" });
    }
};

// NOTE: Limpiar este código, se duplica aquí
const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret);
        const user = await User.findByPk(payload.id);
        const role = await Role.findOne({ where: { User_id: user.id } });

        const admins = ["admin", "superadmin"];
        if (!admins.includes(role.type)) {
            return res.status(403).send({ message: "No tienes permisos" });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al verificar el rol del usuario" });
    }
};

module.exports = { authentication, isAdmin };
