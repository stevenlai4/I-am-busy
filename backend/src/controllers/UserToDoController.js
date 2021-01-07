const UserToDo = require('../models/UserToDo');
const User = require('../models/User');

module.exports = {
    async createUserToDo(req, res) {
        const { user_id } = req.headers;
        const { title, description, date, notification } = req.body;

        try {
            const user = await User.findById(user_id);

            if (!user) {
                return res.json({
                    message: 'User does not exist',
                });
            }

            const todo = await UserToDo.create({
                userId: user_id,
                title,
                description,
                date,
                notification,
                date_created: new Date(),
                priority: false,
                finished: false,
            });

            return res.json(todo);
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

            return res.json({
                message: 'User to do item does not exist',
            });
        } catch (error) {
            throw Error(`Error while getting a user to do : ${error}`);
        }
    },
    async getUserToDos(req, res) {
        const { user_id } = req.headers;

        try {
            const user = await User.findById(user_id);

            // Return 400 bad request when user does not exist
            if (!user) {
                return res.json({
                    message: 'User does not exist',
                });
            }

            const todos = await UserToDo.find({
                userId: user_id,
                finished: false,
            }).sort({ priority: -1, date_created: -1 });

            return res.json(todos);
        } catch (error) {
            throw Error(`Error while getting all user to dos : ${error}`);
        }
    },
    async updateUserToDoById(req, res) {
        const { toDoId } = req.params;
        const { title, description, date, notification, priority } = req.body;

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
                        title,
                        description,
                        date,
                        notification,
                        priority,
                    },
                },
                { new: true, useFindAndModify: false }
            );

            return res.json(todo);
        } catch (error) {
            throw Error(`Error while updating a user to do : ${error}`);
        }
    },
    async finishedUserToDo(req, res) {
        const { toDoId } = req.params;

        try {
            var todo = await UserToDo.findById(toDoId);

            // Return 400 bad request if the user to do item doesn't exist
            if (!todo) {
                return res.json({
                    message: 'User to do item does not exist',
                });
            }

            todo = await UserToDo.findByIdAndUpdate(
                toDoId,
                {
                    $set: {
                        finished: true,
                    },
                },
                { new: true, useFindAndModify: false }
            );

            return res.json(todo);
        } catch (error) {
            throw Error(`Error while finishing a user to do : ${error}`);
        }
    },
    async updateUserToDoDate(req, res) {
        const { toDoId } = req.params;
        const { date } = req.body;

        try {
            var todo = await UserToDo.findById(toDoId);

            // Return 400 bad request if the user to do item doesn't exist
            if (!todo) {
                return res.json({
                    message: 'User to do item does not exist',
                });
            }

            todo = await UserToDo.findByIdAndUpdate(
                toDoId,
                {
                    $set: {
                        date,
                    },
                },
                { new: true, useFindAndModify: false }
            );

            return res.json(todo);
        } catch (error) {
            throw Error(`Error while updating a user to do date : ${error}`);
        }
    },
    async updateUserToDoNotification(req, res) {
        const { toDoId } = req.params;
        const { notification } = req.body;

        try {
            var todo = await UserToDo.findById(toDoId);

            // Return 400 bad request if the user to do item doesn't exist
            if (!todo) {
                return res.json({
                    message: 'User to do item does not exist',
                });
            }

            todo = await UserToDo.findByIdAndUpdate(
                toDoId,
                {
                    $set: {
                        notification,
                    },
                },
                { new: true, useFindAndModify: false }
            );

            return res.json(todo);
        } catch (error) {
            throw Error(
                `Error while updating a user to do notification : ${error}`
            );
        }
    },
    async updateUserToDoPriority(req, res) {
        const { toDoId } = req.params;
        const { priority } = req.body;

        try {
            var todo = await UserToDo.findById(toDoId);

            // Return 400 bad request if the user to do item doesn't exist
            if (!todo) {
                return res.json({
                    message: 'User to do item does not exist',
                });
            }

            todo = await UserToDo.findByIdAndUpdate(
                toDoId,
                {
                    $set: {
                        priority,
                    },
                },
                { new: true, useFindAndModify: false }
            );

            return res.json(todo);
        } catch (error) {
            throw Error(
                `Error while updating a user to do priority : ${error}`
            );
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
            return res.json({
                message: 'User to do item does not exist',
            });
        } catch (error) {
            throw Error(`Error while deleting a user to do : ${error}`);
        }
    },
};
