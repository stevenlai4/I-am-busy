const UserToDo = require('../models/UserToDo');
const User = require('../models/User');
const fetch = require('node-fetch');
const weather = require('../api/Weather');

// Fetch weather api
const weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=49.246292&lon=-123.116226&exclude=hourly,minutely,alerts&appid=${process.env.OPEN_WEATHER_API}`;
var weatherData = {};

async function fetchWeatherApi() {
    try {
        await fetch(weatherApi)
            .then((res) => res.json())
            .then((json) => (weatherData = json));
    } catch (error) {
        throw Error(`Error while fetching weather data: ${error}`);
    }
}

fetchWeatherApi();

module.exports = {
    async createUserToDo(req, res) {
        const { user_id } = req.headers;
        const { title, date, notification } = req.body;

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

            if (!user) {
                return res.json({
                    message: 'User does not exist',
                });
            }

            const todos = await UserToDo.find({
                userId: user_id,
                finished: false,
            }).sort({ priority: -1, date_created: -1 });

            let todosWithWeather = todos.map((todo) => {
                return {
                    ...todo._doc,
                    weather: weather.getWeatherApi(weatherData, todo.date),
                };
            });

            return res.json(todosWithWeather);
        } catch (error) {
            throw Error(`Error while getting all user to dos : ${error}`);
        }
    },
    async updateUserToDoById(req, res) {
        const { toDoId } = req.params;
        const { title, date, notification } = req.body;

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
                        title,
                        date,
                        notification,
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

            const todoWithWeather = {
                ...todo._doc,
                weather: weather.getWeatherApi(weatherData, todo.date),
            };

            return res.json(todoWithWeather);
        } catch (error) {
            throw Error(`Error while updating a user to do date : ${error}`);
        }
    },
    async updateUserToDoNotification(req, res) {
        const { toDoId } = req.params;
        const { notification } = req.body;

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

            return res.json({
                message: 'User to do item does not exist',
            });
        } catch (error) {
            throw Error(`Error while deleting a user to do : ${error}`);
        }
    },
};
