const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
    const { fullname, email, message } = req.body;

    console.log('Form submission received:');
    console.log('Full Name:', fullname);
    console.log('Email:', email);
    console.log('Message:', message);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: `${fullname} <${email}>`,
        to: process.env.GMAIL_USER,
        subject: 'New Contact Form Submission',
        text: `Name: ${fullname}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).send('Something went wrong.');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Form submitted successfully.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});