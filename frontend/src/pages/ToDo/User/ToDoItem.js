import React, { useState } from 'react';
import {
    AiFillCheckCircle,
    AiFillStar,
    AiOutlineCloseCircle,
} from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';
import api from '../../../services/api';
import '../../../style/ToDoItem.scss';
import moment from 'moment';

export default function ToDoItem({
    todo,
    setWarningMsg,
    setRerender,
    setSuccessMsg,
    history,
}) {
    const [date, setDate] = useState(todo.date.split('T')[0]);
    const [notification, setNotification] = useState(todo.notification);
    const [weather, setWeather] = useState(todo.weather);

    // Set warning message timeout
    const setWarningMsgTimeout = () => {
        setTimeout(() => setWarningMsg(''), 3000);
    };

    // Set successful message timeout
    const setSuccessMsgTimeout = () => {
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    // Handle date change
    const handleDateChange = async (e) => {
        try {
            let response = await api.put(`/user/todo/update/date/${todo._id}`, {
                date: e.target.value,
            });

            setDate(response.data.date.split('T')[0]);
            setWeather(response.data.weather);
            setSuccessMsg(
                `"${todo.title}" date & weather successfully changed`
            );
            setSuccessMsgTimeout();
        } catch (error) {
            setWarningMsg(error.response.data.message);
            setWarningMsgTimeout();
        }
    };

    // Handle notification change
    const handleNotificationChange = async (e) => {
        try {
            let response = await api.put(
                `/user/todo/update/notification/${todo._id}`,
                { notification: e.target.checked }
            );

            setNotification(response.data.notification);

            if (response.data.notification) {
                setSuccessMsg(`"${todo.title}" notification turned ON`);
            } else {
                setSuccessMsg(`"${todo.title}" notification turned OFF`);
            }

            setSuccessMsgTimeout();
        } catch (error) {
            setWarningMsg(error.response.data.message);
            setWarningMsgTimeout();
        }
    };

    // Handle finished to do
    const handleFinishToDo = async () => {
        try {
            await api.put(`/user/todo/update/finish/${todo._id}`);

            setRerender((prev) => !prev);
            setSuccessMsg(`"${todo.title}" finished`);
            setSuccessMsgTimeout();
        } catch (error) {
            setWarningMsg(error.response.data.message);
            setWarningMsgTimeout();
        }
    };

    // Handle priority change
    const handlePriorityChange = async () => {
        try {
            let response = await api.put(
                `/user/todo/update/priority/${todo._id}`,
                {
                    priority: !todo.priority,
                }
            );

            setRerender((prev) => !prev);
            if (response.data.priority) {
                setSuccessMsg(`"${todo.title}" prioritized`);
                setSuccessMsgTimeout();
            }
        } catch (error) {
            setWarningMsg(error.response.data.message);
            setWarningMsgTimeout();
        }
    };

    //Handle delete to do
    const handleDeleteToDo = async () => {
        const deleteConfirm = window.confirm(
            'Deleted item cannot be restored! Are you sure you want to delete it?'
        );

        if (!deleteConfirm) {
            return;
        }

        try {
            await api.delete(`/user/todo/${todo._id}`);

            setRerender((prev) => !prev);
            setSuccessMsg(`"${todo.title}" successfully deleted`);
            setSuccessMsgTimeout();
        } catch (error) {
            setWarningMsg(error.response.data.message);
            setWarningMsgTimeout();
        }
    };

    return (
        <div className="todo-item">
            <div className="title">
                <span className="sm-heading">Title:</span>
                <span>{todo.title}</span>
            </div>
            <div className="date">
                <span className="sm-heading">Date:</span>
                <input
                    type="date"
                    min={moment().format('YYYY-MM-DD')}
                    value={date}
                    onChange={handleDateChange}
                />
            </div>
            <div className="weather">
                <span className="sm-heading">Weather:</span>
                <span>{weather}</span>
            </div>
            <div className="notification">
                <span className="sm-heading">Notification:</span>
                <input
                    type="checkbox"
                    onChange={handleNotificationChange}
                    defaultChecked={notification}
                />
            </div>
            <div className="icons">
                <i
                    className="finish"
                    title="Finish Item"
                    onClick={handleFinishToDo}
                >
                    <AiFillCheckCircle />
                </i>
                <i
                    className="update"
                    title="Edit Item"
                    onClick={() => {
                        history.push(`/user/todo/update/${todo._id}`);
                    }}
                >
                    <FaPen />
                </i>
                <i
                    className="priority"
                    title="Prioritize Item"
                    onClick={handlePriorityChange}
                    style={{
                        color: todo.priority ? '#eed555' : 'transparent',
                    }}
                >
                    <AiFillStar />
                </i>
            </div>
            <i className="close" title="Delete Item" onClick={handleDeleteToDo}>
                <AiOutlineCloseCircle />
            </i>
        </div>
    );
}
