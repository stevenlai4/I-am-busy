const User = require('../models/User');
const bcrypt = require('bcrypt');

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

            if (user && !user.emailConfirmed) {
                return res.json({
                    message:
                        'Email not confirmed. Please confirm your email first.',
                });
            }

            if (user && (await bcrypt.compare(password, user.password))) {
                return res.json({
                    _id: user._id,
                    name: user.name,
                });
            }

            return res.json({
                message: 'Email or password does not match',
            });
        } catch (error) {
            throw Error(`Error while logging in a user : ${error}`);
        }
    },
};
