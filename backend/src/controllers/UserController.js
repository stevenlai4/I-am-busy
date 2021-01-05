const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async createUser(req, res) {
        const { name, email, password, mobile } = req.body;

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
                    password: hashedPassword,
                    mobile,
                });

                return res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                });
            }

            // Return 400 bad request and error msg when the email already exist
            return res.json({
                message: 'Email already exists',
            });
        } catch (error) {
            throw Error(`Error while registering a new user : ${error}`);
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

            // Return 400 bad request when user does not exist
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
            // Return 400 bad request when user does not exist
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

            // Return 400 bad request and error msg when the email already exist
            return res.status(400).json({
                message: 'Email already exists',
            });
        } catch (error) {
            throw Error(`Error while updating a user : ${error}`);
        }
    },
};
