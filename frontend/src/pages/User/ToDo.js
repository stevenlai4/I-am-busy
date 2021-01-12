import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import ToDoItem from './ToDoItem';
import '../../style/ToDo.scss';

export default function ToDo({ history }) {
    const [toDos, setToDos] = useState([]);
    const [warningMsg, setWarningMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [rerender, setRerender] = useState(false);
    // Weather for Vancouver Only

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

    // Fetch to do data
    const fetchData = async () => {
        try {
            let response = await api.get('/user/todo', {
                headers: {
                    user_id: user,
                },
            });

            if (response.data.message) {
                setWarningMsg(response.data.message);
            } else {
                setToDos(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const createToDoItem = (todo) => {
        return (
            <ToDoItem
                todo={todo}
                key={todo._id}
                setWarningMsg={setWarningMsg}
                setSuccessMsg={setSuccessMsg}
                setRerender={setRerender}
                history={history}
            />
        );
    };

    return (
        <div className="user-todo">
            <h1>To Do</h1>
            {warningMsg ? <p className="warning-msg">{warningMsg}</p> : ''}
            {successMsg ? <p className="success-msg">{successMsg}</p> : ''}
            <div className="todo-list-heading">
                <p>Title</p>
                <p>Date</p>
                <p>Weather</p>
                <p>Notification</p>
                <p></p>
            </div>
            <div className="todo-list">
                {toDos.length === 0 ? (
                    <p className="empty-todo">Your to do list is empty</p>
                ) : (
                    toDos.map(createToDoItem)
                )}
            </div>
            <div className="todo-links">
                <a href="/user/todo/create">Add New +</a>
            </div>
        </div>
    );
}
