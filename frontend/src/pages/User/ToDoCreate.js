import React, { useState } from 'react';
import api from '../../services/api';
import '../../style/ToDoCreate.scss';

export default function ToDoCreate({ history }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState();
    const [notification, setNotification] = useState(false);
    const [warningMsg, setWarningMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const user = localStorage.getItem('user');

    if (!user) {
        history.push('./login');
    }

    // Set warning message timeout
    const setWarningMsgTimeout = () => {
        setTimeout(() => setWarningMsg(''), 3000);
    };

    // Set successful message timeout
    const setSuccessMsgTimeout = () => {
        setTimeout(() => setSuccessMsg(''), 3000);
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

        let response = await api.post(
            '/user/todo/create',
            {
                title,
                description,
                date,
                notification,
            },
            { headers: { user_id: user } }
        );

        if (response.data.message) {
            setWarningMsg(response.data.message);
            setWarningMsgTimeout();
        } else {
            setSuccessMsg(`"${title}" item added successfully`);
            setSuccessMsgTimeout();
        }
    };

    return (
        <div className="todo-create">
            {warningMsg ? <p className="warning-msg">{warningMsg}</p> : ''}
            {successMsg ? <p className="success-msg">{successMsg}</p> : ''}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        type="text"
                        name="description"
                        placeholder="Optional..."
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        id="date"
                        type="date"
                        name="date"
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="notification">Notification</label>
                    <input
                        id="notification"
                        type="checkbox"
                        name="notification"
                        onChange={(e) => setNotification(e.target.checked)}
                    />
                </div>
                <input type="submit" value="Add" />
            </form>
            <a href="/user/todo">&lt;&lt; Back To Dashboard</a>
        </div>
    );
}
