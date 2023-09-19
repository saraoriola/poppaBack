const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
        user: "poppa.thebridge@gmail.com",

        pass: "ayegcldvtfqyquay",
    },
});

module.exports = transporter;
