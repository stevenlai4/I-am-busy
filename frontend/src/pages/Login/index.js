import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import '../../style/Login.scss';

export default function Login({ setUser }) {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warningMsg, setWarningMsg] = useState('');
    var user = sessionStorage.getItem('user');

    if (user) {
        history.push('/user/todo');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/login', { email, password });
            const userId = response.data._id || false;
            // User Json Web Token (JWT)
            user = response.data.user || false;

            if (user && userId) {
                sessionStorage.setItem('user', user);
                sessionStorage.setItem('user_id', userId);
                sessionStorage.setItem('name', response.data.name);
                setUser(true);
                history.push('/user/todo');
            }
        } catch (error) {
            setWarningMsg(error.response.data.message);
        }
    };

    return (
        <div className="login">
            <h1>LOGIN</h1>
            {warningMsg ? <p className="warning-msg">{warningMsg}</p> : ''}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Submit" />
            </form>
            <div className="no-account-register">
                <span>No account yet? </span>
                <a href="/user/register">Register</a>
            </div>
        </div>
    );
}
