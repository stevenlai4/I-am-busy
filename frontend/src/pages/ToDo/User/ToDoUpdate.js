import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';
import '../../../style/ToDoUpdate.scss';

export default function ToDoUpdate({ history }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [notification, setNotification] = useState(false);
    const [warningMsg, setWarningMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const { todo_id } = useParams();

    const user = sessionStorage.getItem('user');

    if (!user) {
        history.push('/login');
    }

    useEffect(() => {
        fetchToDoData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Set warning message timeout
    const setWarningMsgTimeout = () => {
        setTimeout(() => setWarningMsg(''), 3000);
    };

    // Set successful message timeout
    const setSuccessMsgTimeout = () => {
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    const fetchToDoData = async () => {
        try {
            let response = await api.get(`user/todo/${todo_id}`);

            setTitle(response.data.title);
            setDate(new Date(response.data.date).toISOString().split('T')[0]);
            setNotification(response.data.notification);
        } catch (error) {
            setWarningMsg(error.response.data.message);
            setWarningMsgTimeout();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Inputs validation
        if (!title && !date) {
            setWarningMsg('Title & date cannot be empty');
            setWarningMsgTimeout();
            return;
        } else if (!title) {
            setWarningMsg('Title cannot be empty');
            setWarningMsgTimeout();
            return;
        } else if (!date) {
            setWarningMsg('Date cannot be empty');
            setWarningMsgTimeout();
            return;
        }

        try {
            await api.put(`/user/todo/update/${todo_id}`, {
                title,
                date,
                notification,
            });

            setSuccessMsg(`"${title}" updated successfully`);
            setSuccessMsgTimeout();
        } catch (error) {
            setWarningMsg(error.response.data.message);
            setWarningMsgTimeout();
        }
    };

    return (
        <div className="todo-update">
            <h1>To Do Update</h1>
            {warningMsg ? <p className="warning-msg">{warningMsg}</p> : ''}
            {successMsg ? <p className="success-msg">{successMsg}</p> : ''}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        id="date"
                        type="date"
                        name="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="notification">Notification</label>
                    <input
                        id="notification"
                        type="checkbox"
                        name="notification"
                        defaultChecked={notification}
                        onChange={(e) => setNotification(e.target.checked)}
                    />
                </div>
                <input type="submit" value="Update" />
            </form>
            <a href="/user/todo">&lt;&lt; Back To Dashboard</a>
        </div>
    );
}
