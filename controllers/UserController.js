const { User, Token, Sequelize } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;
const transporter = require("../config/nodemailer");
require("dotenv").config();

const UserController = {

  async getAll(req, res) {
    try {
      const getAllUsers = await User.findAll();
      res.status(200).send(getAllUsers);
    } catch (error) {
      console.error(error);
    }
  },
  async getById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      res.send({ message: "¡Sí! ¡Lo encontraste!", user });
    } catch (error) {
      res.status(500).send({
        message:
          "Lo sentimos, ¡No encontramos a este usuario! Compruebe si el número de identificación es correcto.", error
      });
    }
  },
  async getUserByName(req, res) {
    try {
      const user = await User.findAll({
        where: { name: { [Op.like]: `%${req.params.name}%` } }
      });
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: '¡Lo siento! ¡No encontramos ningún usuario con esta letra!', user });
      }
    } catch (error) {
      res.status(500).send({ message: 'Ocurrió un error al intentar encontrar el usuario', error });
    }
  },
  async create(req, res, next) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password, confirmed: false });
      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: '48h' })
      const url = 'http://localhost:3001/users/confirm/' + emailToken
      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirme su registro",
        html: `<h3>Bienvenido, estas a un paso de registrarte </h3>
        <a href="${url}"> Click para confirmar tu registro</a>
        `,
      });
      res.status(201).send({ message: "Usuario creado con éxito", user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  async confirm(req, res) {

    try {
      const token = req.params.emailToken
      const payload = jwt.verify(token, jwt_secret)
      User.update({ confirmed: true }, {
        where: {
          email: payload.email
        }
      })
      res.status(201).send("Usuario confirmado con éxito");
    } catch (error) {
      console.error(error)
    }
  },
  async update(req, res) {
    try {
      const UserId = req.params.id;
      const updatedData = req.body;
      if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        updatedData.password = hashedPassword;
      }
      await User.update(updatedData, {
        where: { id: UserId }
      });

      res.send("User actualizado con éxito !");
    } catch (error) {
      res.status(500).send({ message: "Erro al se actualizar el usuario", error });
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
        return res.status(400).send({ msg: "Nombre de usuario o contraseña incorrecta" });

      }
      if (!user.confirmed) {

        return res.status(400).send({ message: "Debes confirmar tu correo" })
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Nombre de usuario o contraseña incorrecta" });
      }

      const token = jwt.sign({ id: user.id }, jwt_secret);
      const createdToken = await Token.create({ token, User_id: user.id });

      res.send({ msg: "Logeado con éxito", token, user, createdToken });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async recoverPassword(req, res) {
    try {
      const recoverToken = jwt.sign({ email: req.params.email }, jwt_secret, {
        expiresIn: "48h",
      });
      const url = "http://localhost:3001/users/resetPassword/" + recoverToken;
      await transporter.sendMail({
        to: req.params.email,
        subject: "Recuperar contraseña",
        html: `<h3> Recuperar contraseña </h3>
    <a href="${url}">Recuperar contraseña</a>
    El enlace expirará en 48 horas
    `,
      });
      res.send({
        message: "Un correo de recuperación se envio a tu dirección de correo",
      });
    } catch (error) {
      console.error(error);
    }
  },
  async resetPassword(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const recoverToken = req.params.recoverToken;
      const payload = jwt.verify(recoverToken, jwt_secret);
      const whereCondition = { email: payload.email };
      await User.update(
        { password:password },
        { where: whereCondition } 
      );
      res.send({ message: "contraseña cambiada con éxito" });
    } catch (error) {
      console.error(error);
    }
  },  
  async delete(req, res) {
    try {
      const user = await User.destroy({
        where: {
          id: req.params.id
        }
      });
      if (user) {
        res.send({ message: 'Usuario borrado con éxito!' });
      } else {
        res.status(404).send({ message: 'Usuario no encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error de servidor.', error });
    }
  },
  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { User_id: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
};

module.exports = UserController;
