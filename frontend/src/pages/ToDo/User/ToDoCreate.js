import React, { useState } from 'react';
import moment from 'moment';
import api from '../../../services/api';
import '../../../style/ToDoCreate.scss';

export default function ToDoCreate({ history }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState();
    const [notification, setNotification] = useState(false);
    const [warningMsg, setWarningMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const user = sessionStorage.getItem('user');

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

        try {
            await api.post(
                '/user/todo/create',
                {
                    title,
                    date,
                    notification,
                },
                { headers: { user: user } }
            );

            setSuccessMsg(`"${title}" item added successfully`);
            setSuccessMsgTimeout();
        } catch (error) {
            setWarningMsg(error.response.data.message);
            setWarningMsgTimeout();
        }
    };

    return (
        <div className="todo-create">
            <h1>To Do Creation</h1>
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
                    <label htmlFor="date">Date</label>
                    <input
                        id="date"
                        type="date"
                        name="date"
                        min={moment().format('YYYY-MM-DD')}
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
