const { User, Token, Sequelize } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;
// const transporter = require("../config/nodemailer");
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
      const user = await User.findOne({
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
      const user = await User.create({ ...req.body, password });
      res.status(201).send({ message: "Usuario creado con éxito", user });
    } catch (error) {
      console.error(error);
      next(error);
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
        res.status(500).send({message:"Erro al se actualizar el usuario", error});
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
