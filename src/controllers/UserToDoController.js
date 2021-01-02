const UserToDo = require('../models/UserToDo');
const User = require('../models/User');

module.exports = {
    async createUserToDo(req, res) {
        const { user_id } = req.headers;
        const { title, description, date, notification, priority } = req.body;

        const user = await User.findById(user_id);

        // Return 400 bad request when user does not exist
        if (!user) {
            return res.status(400).json({
                message: 'User does not exist',
            });
        }

        try {
            const userToDo = await UserToDo.create({
                title,
                description,
                date,
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
    async getUserToDoById(req, res) {
        const { toDoId } = req.params;

        try {
            const todo = await UserToDo.findById(toDoId);

            if (todo) {
                return res.json(todo);
            }

            // Return 400 bad request if the user to do item doesn't exist
            return res.status(400).json({
                message: 'User to do item does not exist',
            });
        } catch (error) {
            throw Error(`Error while getting a user to do : ${error}`);
        }
    },
    async getUserToDos(req, res) {
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        // Return 400 bad request when user does not exist
        if (!user) {
            return res.status(400).json({
                message: 'User does not exist',
            });
        }

        try {
            const todos = await UserToDo.find({ _id: user.todo });

            return res.json(todos);
        } catch (error) {
            throw Error(`Error while getting all user to dos : ${error}`);
        }
    },
    async updateUserToDoById(req, res) {
        const { toDoId } = req.params;
        const { title, description, date, notification, priority } = req.body;

        var todo = await UserToDo.findById(toDoId);

        // Return 400 bad request if the user to do item doesn't exist
        if (!todo) {
            return res.status(400).json({
                message: 'User to do item does not exist',
            });
        }

        try {
            todo = await UserToDo.findByIdAndUpdate(
                toDoId,
                {
                    title,
                    description,
                    date,
                    notification,
                    priority,
                },
                { new: true, useFindAndModify: false }
            );

            return res.json(todo);
        } catch (error) {
            throw Error(`Error while updating a user to do : ${error}`);
        }
    },
    async deleteUserToDo(req, res) {
        const { toDoId } = req.params;

        try {
            const todo = await UserToDo.findByIdAndDelete(toDoId);

            if (todo) {
                return res.status(204).send();
            }

            // Return 400 bad request if the user to do item doesn't exist
            return res.status(400).json({
                message: 'User to do item does not exist',
            });
        } catch (error) {
            throw Error(`Error while deleting a user to do : ${error}`);
        }
    },
};
