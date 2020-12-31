const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async store(req, res) {
        try {
            const { name, email, password, mobile } = req.body;

            const existentUser = await User.findOne({ email });

            // Only creating a new user when the email doesn't exist previously
            if (!existentUser) {
                const hashedPassword = await bcrypt.hash(password, 10);
                // Creating a new user
                const user = await User.create({
                    name,
                    email,
                    password: hashedPassword,
                    mobile,
                });

                return res.json({
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                });
            }

            // Return 400 bad request and error msg when the email already exist
            return res.status(400).json({
                message: 'Email already exists',
            });
        } catch (error) {
            throw Error(`Error while registering a new user : ${error}`);
        }
    },
};
