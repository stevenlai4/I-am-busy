const UserToDo = require('../models/UserToDo');
const User = require('../models/User');
const moment = require('moment');
const jwt = require('jsonwebtoken');

module.exports = {
    getUserToDoHistory(req, res) {
        jwt.verify(req.token, 'secret', async (err, authData) => {
            try {
                const user = await User.findById(authData.user._id);

                if (!user) {
                    return res.status(400).json({
                        message: 'User does not exist',
                    });
                }

                const todos = await UserToDo.find({
                    userId: authData.user._id,
                    finished: true,
                }).sort({ date: -1, date_created: -1 });

                return res.json(todos);
            } catch (error) {
                throw Error(
                    `Error while getting user to do history : ${error}`
                );
            }
        });
    },
    async restoreUserToDo(req, res) {
        const { toDoId } = req.params;

        try {
            var todo = await UserToDo.findById(toDoId);

            if (!todo) {
                return res.status(400).json({
                    message: 'User to do item does not exist',
                });
            }

            todo = await UserToDo.findByIdAndUpdate(
                toDoId,
                {
                    $set: {
                        date: moment().format('YYYY-MM-DD'),
                        finished: false,
                        priority: false,
                    },
                },
                { new: true, useFindAndModify: false }
            );

            return res.json(todo);
        } catch (error) {
            throw Error(`Error while finishing a user to do : ${error}`);
        }
    },
};
