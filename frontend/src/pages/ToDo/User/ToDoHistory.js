import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import ToDoHistoryItem from './ToDoHistoryItem';
import '../../../style/ToDoHistory.scss';

export default function ToDoHistory({ history }) {
    const [toDos, setToDos] = useState([]);
    const [warningMsg, setWarningMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [rerender, setRerender] = useState(false);
    const user = sessionStorage.getItem('user');

    if (!user) {
        history.push('/login');
    }

    // CDM
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // CDU
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rerender]);

    const fetchData = async () => {
        try {
            let response = await api.get('/user/todo/history', {
                headers: {
                    user_id: user,
                },
            });

            setToDos(response.data);
        } catch (error) {
            setWarningMsg(error.response.data.message);
        }
    };

    const createHistoryItem = (todo) => {
        return (
            <ToDoHistoryItem
                todo={todo}
                key={todo._id}
                setWarningMsg={setWarningMsg}
                setSuccessMsg={setSuccessMsg}
                setRerender={setRerender}
            />
        );
    };

    return (
        <div className="todo-history">
            <h1>To Do History</h1>
            {warningMsg ? <p className="warning-msg">{warningMsg}</p> : ''}
            {successMsg ? <p className="success-msg">{successMsg}</p> : ''}
            <div className="todo-history-heading">
                <p>Title</p>
                <p>Date</p>
                <p>Notification</p>
            </div>
            <div className="todo-list">
                {toDos.length === 0 ? (
                    <p className="empty-todo">Your to do history is empty</p>
                ) : (
                    toDos.map(createHistoryItem)
                )}
            </div>
        </div>
    );
}
