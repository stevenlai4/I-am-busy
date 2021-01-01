const UserToDo = require('../models/UserToDo');
const User = require('../models/User');

module.exports = {
    async createUserToDo(req, res) {
        const { user_id } = req.headers;
        const {
            title,
            description,
            date,
            weather,
            notification,
            priority,
        } = req.body;

        try {
            const userToDo = await UserToDo.create({
                title,
                description,
                date,
                weather,
                notification,
                priority,
            }).then((todo) => {
                return User.findByIdAndUpdate(
                    user_id,
                    {
                        $push: {
                            todo: todo._id,
                        },
                    },
                    { new: true, useFindAndModify: false }
                );
            });

            return res.json(userToDo);
        } catch (error) {
            throw Error(`Error while creating a user to do : ${error}`);
        }
    },
};
