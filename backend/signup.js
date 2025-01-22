var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./db_controller');
var nodemailer = require('nodemailer');
var randomToken = require('random-token');
const { check, validationResult } = require('express-validator');

// Load environment variables
require('dotenv').config();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/signup', (req, res) => {
    return res.status(200).send({ message: 'Signup endpoint is ready' });
});

router.post(
    '/signup',
    [
        check('username').notEmpty().withMessage("username is required"),
        check('password').notEmpty().withMessage("password is required"),
        check('email').notEmpty().withMessage("email is required")
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        var email_status = "not_verified";
        var email = req.body.email;
        var username = req.body.username;

        db.signup(req.body.username, req.body.email, req.body.password, email_status);
        var token = randomToken(8);
        db.verify(req.body.username, email, token);

        db.getuserid(email, function (err, result) {
            if (err) {
                console.log(err)
                return res.status(500).send('Error fetching user ID');
            }
            var id = result.id;
            var output = `<p>Dear ${username},</p>
                <p>Thanks for signup. Your verification id and token is given below:</p>
                <ul>
                    <li>User ID: ${id}</li>
                    <li>Token: ${token}</li>
                </ul>
                <p>Verify link: <a href="http://localhost:3400/verify">Verify</a></p>
                <p><b>This is an automatically generated mail</b></p>`;

            var transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                debug:true
            });

            var mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Email Verification',
                html: output
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error sending email');
                }
                console.log(info);
                res.send("Check your email for token to verify");
            });
        });
    }
);

module.exports = router;
