const { User, Token, Sequelize } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"]
const { Op } = Sequelize;
const transporter = require("../config/nodemailer");
require("dotenv").config();

const UserController = {

    async create(req, res, next) {
        try {
            req.body.role = "user";
            const password = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({ ...req.body, password });
            res.status(201).send({ msg: "User has been created", user });
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
                return res.status(400).send({ msg: "Incorrect username or password" });
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({ msg: "Incorrect username or password" });
            }


            const token = jwt.sign({ id: user.id }, jwt_secret, {
                expiresIn: "10000",
            });
            await Token.create({ token, UserId: user.id });
            res.send({ msg: "Successfully login", token, user });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async logout(req, res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [
                        { UserId: req.user.id },
                        { token: req.headers.authorization },
                    ],
                },
            });
            res.send({ msg: "Successfully disconnected" });
        } catch (error) {
            console.log(error);
            res
                .status(500)
                .send({ msg: "Sorry, something went wrong" });
        }
    },

}

module.exports = UserController;
