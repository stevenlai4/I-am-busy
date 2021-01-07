import React, { useState } from 'react';
import api from '../../services/api';
import '../../style/Register.scss';

export default function Register({ history }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [mobile, setMobile] = useState(0);
    const [warningMsg, setWarningMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await api.post(
            '/user/register',
            {
                name,
                email,
                password,
                mobile,
            },
            { headers: { client_host: window.location.host } }
        );

        if (response.data.message) {
            setWarningMsg(response.data.message);
        } else if (passwordMatch) {
            history.push('/user/email-confirm');
        }
    };

    return (
        <div className="register">
            <h1>REGISTER</h1>
            {warningMsg ? <p className="warning-msg">{warningMsg}</p> : ''}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        id="mobile"
                        type="text"
                        name="mobile"
                        onChange={(e) => setMobile(e.target.value)}
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
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirm-password"
                        onChange={(e) => {
                            if (e.target.value !== password) {
                                setPasswordMatch(false);
                                setWarningMsg(
                                    'Password & Confirm Password not match'
                                );
                            } else {
                                setPasswordMatch(true);
                                setWarningMsg('');
                            }
                        }}
                    />
                </div>
                <input type="submit" value="Submit" />
            </form>
            <div className="has-account-login">
                <span>Already have an account? </span>
                <a href="/login">Login</a>
            </div>
        </div>
    );
}
