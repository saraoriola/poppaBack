const { User, Token, Sequelize } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;
// const transporter = require("../config/nodemailer");
require("dotenv").config();

const UserController = {
  async create(req, res, next) {
    try {
      const { name, email } = req.body;

      if (!name || !email || !req.body.password) {
        //NOTE: para no chafar el password de abajo
        return res
          .status(400)
          .send({ message: "Debes completar todos los campos" });
      }

      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password });
      res.status(201).send({ msg: "Usuario creado con éxito", user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        return res.status(400).send({ msg: "Email o contraseña incorrectos" });
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Email o contraseña incorrectos" });
      }

      const token = jwt.sign({ id: user.id }, jwt_secret);

      // Ahora, crea el token asociado al usuario que inició sesión
      const createdToken = await Token.create({ token, User_id: user.id });

      res.send({ msg: "Logeado con éxito", token, user, createdToken });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  logout(req, res) {
    Token.destroy({
      where: {
        [Op.and]: [
          { User_id: req.user.id },
          { token: req.headers.authorization },
        ],
      },
    })
      .then(() => res.send({ message: "Desconectado con éxito" }))
      .catch((error) => {
        console.error(error);
        res.status(500).send(error);
      });
  },
};

module.exports = UserController;
