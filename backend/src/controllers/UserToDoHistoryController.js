const UserToDo = require('../models/UserToDo');
const User = require('../models/User');

module.exports = {
    async getUserToDoHistory(req, res) {
        const { user_id } = req.headers;

        try {
            const user = await User.findById(user_id);

            // Return 400 bad request when user does not exist
            if (!user) {
                return res.status(400).json({
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

            // Return 400 bad request if the user to do item doesn't exist
            if (!todo) {
                return res.status(400).json({
                    message: 'User to do item does not exist',
                });
            }

            todo = await UserToDo.findByIdAndUpdate(
                toDoId,
                {
                    $set: {
                        finished: false,
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
