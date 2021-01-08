const UserToDo = require('../models/UserToDo');
const User = require('../models/User');

module.exports = {
    async getUserToDoHistory(req, res) {
        const { user_id } = req.headers;

        try {
            const user = await User.findById(user_id);

            if (!user) {
                return res.json({
                    message: 'User does not exist',
                });
            }

            const todos = await UserToDo.find({
                userId: user_id,
                finished: true,
            });

            return res.json(todos);
        } catch (error) {
            throw Error(`Error while getting user to do history : ${error}`);
        }
    },
    async restoreUserToDo(req, res) {
        const { toDoId } = req.params;

        try {
            var todo = await UserToDo.findById(toDoId);

            if (!todo) {
                return res.json({
                    message: 'User to do item does not exist',
                });
            }

            todo = await UserToDo.findByIdAndUpdate(
                toDoId,
                {
                    $set: {
                        date: new Date(),
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
