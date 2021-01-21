const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// Need this for sendgrid
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
// Set sendgrid api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    async createUser(req, res) {
        const { name, email, password, mobile } = req.body;
        const { client_host } = req.headers;

        if (!name || !email || !password || !mobile) {
            return res.status(200).json({
                message: 'All fields must be filled',
            });
        }

        try {
            const existentUser = await User.findOne({ email });

            // Only creating a new user when the email doesn't exist previously
            if (!existentUser) {
                const hashedPassword = await bcrypt.hash(password, 10);
                // Creating a new user
                const user = await User.create({
                    name,
                    email,
                    emailToken: crypto.randomBytes(64).toString('hex'),
                    emailConfirmed: false,
                    password: hashedPassword,
                    mobile,
                });

                // Sendgrid message
                const msg = {
                    from: 'steven_lai4@hotmail.com',
                    to: user.email,
                    subject: 'I Am Busy - Email Confirmation',
                    text: `
                    Thanks for registering an account!
                    Please copy and paste the following address to verify your account.
                    http://${client_host}/user/email-verified/${user.emailToken}
                    `,
                    html: `<h1>I Am Busy</h1>
                    <p>Thanks for registering an account!</p>
                    <p>Please click the following link to verify your account.</p>
                    <a href="http://${client_host}/user/email-verified/${user.emailToken}">Confirm Your Email</a>`,
                };

                // Send a sendgrid email verification email
                try {
                    await sgMail.send(msg);
                } catch (error) {
                    return res.status(400).json({
                        message:
                            'Error while sending a confirmation email. Please contact us for assistance.',
                    });
                }

                return res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                });
            }

            return res.status(400).json({
                message: 'Email already exists',
            });
        } catch (error) {
            throw Error(`Error while registering a new user : ${error}`);
        }
    },
    async verifyUserEmail(req, res) {
        const { email_token } = req.headers;

        try {
            const user = await User.findOne({ emailToken: email_token });

            if (!user) {
                return res.status(400).json({
                    message: 'Token invalid. Please contact us for assistance.',
                });
            }

            user.emailToken = null;
            user.emailConfirmed = true;
            await user.save();

            return res.json({
                _id: user._id,
                email: user.email,
                name: user.name,
            });
        } catch (error) {
            return res.status(400).json({
                message:
                    'Something went wrong. Please contact us for assistance.',
            });
        }
    },
    async getUserById(req, res) {
        const { user_id } = req.headers;

        try {
            const user = await User.findById(user_id);

            if (user) {
                return res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    team: user.team,
                });
            }

            return res.status(400).json({
                message: 'User does not exist',
            });
        } catch (error) {
            throw Error(`Error while getting a user : ${error}`);
        }
    },
    async updateUser(req, res) {
        const { user_id } = req.headers;
        const { name, email, password, mobile } = req.body;

        try {
            var user = await User.findById(user_id);
            if (!user) {
                return res.status(400).json({
                    message: 'User does not exist',
                });
            }

            const existentEmail = await User.findOne({ email });

            if (!existentEmail || user.email === email) {
                const hashedPassword = await bcrypt.hash(password, 10);

                user = await User.findByIdAndUpdate(
                    user_id,
                    {
                        name,
                        email,
                        password: hashedPassword,
                        mobile,
                    },
                    { new: true, useFindAndModify: false }
                );

                return res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                });
            }

            return res.status(400).json({
                message: 'Email already exists',
            });
        } catch (error) {
            throw Error(`Error while updating a user : ${error}`);
        }
    },
};
