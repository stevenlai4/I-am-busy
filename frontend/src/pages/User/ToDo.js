import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import ToDoItem from './ToDoItem';
import '../../style/ToDo.scss';

export default function ToDo({ history }) {
    const [toDos, setToDos] = useState([]);
    const [warningMsg, setWarningMsg] = useState('');
    const [rerender, setRerender] = useState(false);

    const user = localStorage.getItem('user');

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
        let res_todos = await api.get('/user/todo', {
            headers: {
                user_id: user,
            },
        });

        if (!res_todos.data.message) {
            setToDos(res_todos.data);
        } else {
            setWarningMsg(res_todos.data.message);
        }
    };

    const createToDoItem = (todo) => {
        return (
            <ToDoItem
                todo={todo}
                key={todo._id}
                setWarningMsg={setWarningMsg}
                setRerender={setRerender}
                history={history}
            />
        );
    };

    return (
        <div className="user-todo">
            <h1>To Do</h1>
            {warningMsg ? <p className="warning-msg">{warningMsg}</p> : ''}
            <div className="todo-list-heading">
                <p>Title</p>
                <p>Date</p>
                <p>Weather</p>
                <p>Notification</p>
                <p></p>
            </div>
            <div className="todo-list">
                {toDos.length === 0 ? (
                    <p>Your to do list is empty</p>
                ) : (
                    toDos.map(createToDoItem)
                )}
            </div>
            <div className="todo-links">
                <a href="/user/todo/create">Add New +</a>
                {/* <a href="">Browse to do history...</a> */}
            </div>
        </div>
    );
}
