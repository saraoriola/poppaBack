require("dotenv").config();
const { User, Token, Sequelize, Role, EventUser, Event } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const { jwt_secret } = require("../config/config.js")[env];
const { Op } = Sequelize;
const transporter = require("../config/nodemailer");

const regExPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

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
                message: "Lo sentimos, ¡No encontramos a este usuario! Compruebe si el número de identificación es correcto.",
                error,
            });
        }
    },

    async getUserByName(req, res) {
        try {
            const user = await User.findAll({
                where: { name: { [Op.like]: `%${req.params.name}%` } },
            });
            if (user) {
                res.send(user);
            } else {
                res.status(404).send({
                    message: "¡Lo siento! ¡No encontramos ningún usuario con esta letra!",
                    user,
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Ocurrió un error al intentar encontrar el usuario",
                error,
            });
        }
    },

    async getUserConnected(req, res) {
        try {
            const getUser = await User.findOne({
                where: {
                    id: req.user.id,
                },
            });
            if (!getUser) {
                return res.status(404).send({ message: "Usuario no conectado" });
            }
            res.send({ message: "User", getUser });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Intente novamente", error });
        }
    },

    //NOTE: No se si he de crear un usuario para eventUser o se asigna manualmente
    async register(req, res, next) {
        try {
            const { password } = req.body;

            if (!regExPass.test(password)) {
                return res.status(400).send({
                    message: "La contraseña debe tener un mínimo de 8 carácters, una mayúscula, una minúscula y un carácter especial",
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                ...req.body,
                password: hashedPassword,
                confirmed: false,
                avatar: req.file?.filename,
            });

            const role = await Role.create({
                User_id: user.id,
                type: "user",
            });

            const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, {
                expiresIn: "48h",
            });

            const url = "http://localhost:3001/users/confirm/" + emailToken;
            await transporter.sendMail({
                to: req.body.email,
                subject: "Confirme su registro",
                html: `<h3>Bienvenido, estas a un paso de registrarte </h3>
        <a href="${url}"> Click para confirmar tu registro</a>
        `,
            });

            res.status(201).send({ message: "Usuario creado con éxito", user, role });
        } catch (error) {
            console.error(error);
            next(error);
        }
    },

    async confirm(req, res) {
        try {
            const token = req.params.emailToken;
            const payload = jwt.verify(token, jwt_secret);
            User.update(
                { confirmed: true },
                {
                    where: {
                        email: payload.email,
                    },
                }
            );
            res.status(201).send("Usuario confirmado con éxito");
        } catch (error) {
            console.error(error);
        }
    },

    async login(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                },
                include: [
                    { model: Role, as: "role" },
                    { model: Event, as: "events" },
                ],
            });
            if (!user) {
                return res.status(400).send({ msg: "Nombre de usuario o contraseña incorrecta" });
            }
            if (!user.confirmed) {
                return res.status(400).send({ message: "Debes confirmar tu correo" });
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

    async update(req, res) {
        try {
            const { id } = req.params;
            const updatedData = req.body;

            if (req.body.password) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                updatedData.password = hashedPassword;
            }

            const updateUser = await User.update(updatedData, {
                where: {
                    id: id,
                },
            });

            if (!updateUser) {
                return res.status(404).send({ message: "Usuario no conectado" });
            } else {
                res.status(200).send({ message: "Usuario actualizado con éxito", updatedData });
            }
        } catch (error) {
            res.status(500).send({ message: "Error al se actualizar el usuario", error });
        }
    },

    async updateMySelf(req, res) {
        try {
            const updatedData = req.body;
            if (req.body.password) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                updatedData.password = hashedPassword;
            }

            const updateUser = await User.update(updatedData, {
                where: {
                    id: req.user.id,
                },
            });

            if (!updateUser) {
                return res.status(404).send({ message: "Usuario no conectado" });
            } else {
                res.status(200).send({ message: "Usuario actualizado con éxito", updatedData });
            }
        } catch (error) {
            res.status(500).send({ message: "Error al se actualizar el usuario", error });
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
            const { password } = req.body;

            if (!regExPass.test(password)) {
                return res.status(400).send({
                    message: "La contraseña debe tener un mínimo de 8 carácters, una mayúscula, una minúscula y un carácter especial",
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const recoverToken = req.params.recoverToken;
            const payload = jwt.verify(recoverToken, jwt_secret);
            const whereCondition = { email: payload.email };
            await User.update({ password: hashedPassword }, { where: whereCondition });
            res.send({ message: "Contraseña cambiada con éxito" });
        } catch (error) {
            console.error(error);
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;

            await User.destroy({
                where: {
                    id: id,
                },
            });

            await Token.destroy({
                where: {
                    User_id: id,
                },
            });

            await Role.destroy({
                where: {
                    User_id: id,
                },
            });

            await EventUser.destroy({
                where: {
                    User_id: id,
                },
            });

            if (!id) {
                res.status(404).send({ message: "Usuario no encontrado." });
            } else {
                res.send({ message: "Usuario borrado con éxito!" });
            }
        } catch (error) {
            res.status(500).send({ message: "Error al eliminar el usuario", error });
        }
    },

    async deleteMyAccount(req, res) {
        try {
            const user = req.body;

            await User.destroy({
                where: {
                    id: req.user.id,
                },
            });

            await Token.destroy({
                where: {
                    User_id: req.user.id,
                },
            });

            await Role.destroy({
                where: {
                    User_id: req.user.id,
                },
            });

            await EventUser.destroy({
                where: {
                    User_id: req.user.id,
                },
            });

            if (!user) {
                res.status(404).send({ message: "Usuario no encontrado." });
            } else {
                res.status(200).send({ message: "Usuario borrado con éxito!" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error de servidor.", error });
        }
    },

    async logout(req, res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [{ User_id: req.user.id }, { token: req.headers.authorization }],
                },
            });
            res.send({ message: "Desconectado con éxito" });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
};

module.exports = UserController;
