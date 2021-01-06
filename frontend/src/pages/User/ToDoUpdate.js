import React from 'react';

export default function ToDoUpdate({ history }) {
    const user = localStorage.getItem('user');

    if (!user) {
        history.push('/login');
    }

    return <div>Hello this is to do update</div>;
}
