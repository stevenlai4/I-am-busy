const User = require('../models/User');
const bcrypt = require('bcrypt');
const { json } = require('express');

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(200).json({
                message: 'Email/password field missing',
            });
        }

        try {
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                return res.json({
                    _id: user._id,
                    email: user.email,
                });
            }

            return res.status(401).json({
                message: 'Email or password does not match',
            });
        } catch (error) {
            throw Error(`Error while logging in a user : ${error}`);
        }
    },
};
