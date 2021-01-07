import React, { useState } from 'react';
import {
    AiFillCheckCircle,
    AiFillStar,
    AiOutlineCloseCircle,
} from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';
import api from '../../services/api';
import '../../style/ToDoItem.scss';

export default function ToDoItem({
    todo,
    setWarningMsg,
    setRerender,
    history,
}) {
    const [date, setDate] = useState(new Date(todo.date));
    const [notification, setNotification] = useState(todo.notification);

    // Handle date change
    const handleDateChange = async (e) => {
        let response = await api.put(`/user/todo/update/date/${todo._id}`, {
            date: e.target.value,
        });

        if (response.data.message) {
            setWarningMsg(response.data.message);
        } else {
            setDate(new Date(response.data.date));
        }
    };

    // Handle notification change
    const handleNotificationChange = async (e) => {
        let response = await api.put(
            `/user/todo/update/notification/${todo._id}`,
            { notification: e.target.checked }
        );

        if (response.data.message) {
            setWarningMsg(response.data.message);
        } else {
            setNotification(response.data.notification);
        }
    };

    // Handle finished to do
    const handleFinishToDo = async () => {
        let response = await api.put(`/user/todo/update/finish/${todo._id}`);

        if (response.data.message) {
            setWarningMsg(response.data.message);
        } else {
            setRerender((prev) => !prev);
        }
    };

    // Handle priority change
    const handlePriorityChange = async () => {
        let response = await api.put(`/user/todo/update/priority/${todo._id}`, {
            priority: !todo.priority,
        });

        if (response.data.message) {
            setWarningMsg(response.data.message);
        } else {
            setRerender((prev) => !prev);
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

        let response = await api.delete(`/user/todo/${todo._id}`);

        if (response.data.message) {
            setWarningMsg(response.data.message);
        } else {
            setRerender((prev) => !prev);
        }
    };

    return (
        <div className="todo-item">
            <div className="title">
                <span className="sm-heading">Title:</span>
                <span>{todo.title}</span>
            </div>
            <div className="description">
                <span className="sm-heading">Description:</span>
                <span>{todo.description}</span>
            </div>
            <div className="date">
                <span className="sm-heading">Date:</span>
                <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date.toISOString().split('T')[0]}
                    onChange={handleDateChange}
                />
            </div>
            <div className="weather">
                <span className="sm-heading">Weather:</span>
                <span>Sunny</span>
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
                <i className="finish" onClick={handleFinishToDo}>
                    <AiFillCheckCircle />
                </i>
                <i
                    className="update"
                    onClick={() => {
                        history.push(`/user/todo/update/${todo._id}`);
                    }}
                >
                    <FaPen />
                </i>
                <i
                    className="priority"
                    onClick={handlePriorityChange}
                    style={{
                        color: todo.priority ? '#eed555' : 'transparent',
                    }}
                >
                    <AiFillStar />
                </i>
            </div>
            <i className="close" onClick={handleDeleteToDo}>
                <AiOutlineCloseCircle />
            </i>
        </div>
    );
}
