const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const app = express();
app.use(cors({origin: true}));

app.post("/", (req, res) => {
    const {body} = req;
    const isValidMessage = body.message && body.to && body.subject;

    if(!isValidMessage) {
        return res.status(400).send({ message: "Invalid request" });
    }

    const transporter = nodemailer.createTransport( {
        service: "gmail",
        auth: {
            user: "attihulej@gmail.com",
            pass: "ppsattiehulej"
        }
    })

    const mailOptions = {
        from: "attiehulej@gmail.com",
        to: body.to,
        subject: body.subject,
        text: body.message
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(mailOptions);
            return res.status(500).send({ message: "error: " + mailOptions });
        }
        return res.send({ message: "email sent" });
    });
});

module.exports.mailer = functions.https.onRequest(app);