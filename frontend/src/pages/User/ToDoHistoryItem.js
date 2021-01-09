import React from 'react';
import { MdRestore } from 'react-icons/md';
import api from '../../services/api';
import '../../style/ToDoHistoryItem.scss';

export default function ToDoHistoryItem({
    todo,
    setWarningMsg,
    setSuccessMsg,
    setRerender,
}) {
    // Set warning message timeout
    const setWarningMsgTimeout = () => {
        setTimeout(() => setWarningMsg(''), 3000);
    };

    // Set successful message timeout
    const setSuccessMsgTimeout = () => {
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    const handleToDoRestore = async () => {
        try {
            let response = await api.put(`/user/todo/history/${todo._id}`);

            if (response.data.message) {
                setWarningMsg(response.data.message);
                setWarningMsgTimeout();
            } else {
                setRerender((prev) => !prev);
                setSuccessMsg(`${todo.title} successfully restored`);
                setSuccessMsgTimeout();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="history-item">
            <div className="title">
                <span className="sm-heading">Title:</span>
                <span>{todo.title}</span>
            </div>
            <div className="date">
                <span className="sm-heading">Date:</span>
                <span>{new Date(todo.date).toISOString().split('T')[0]}</span>
            </div>
            <div className="notification">
                <span className="sm-heading">Notification:</span>
                <span>{todo.notification ? 'ON' : 'OFF'}</span>
            </div>
            <i
                className="restore"
                title="Restore Item"
                onClick={handleToDoRestore}
            >
                <MdRestore />
            </i>
        </div>
    );
}
