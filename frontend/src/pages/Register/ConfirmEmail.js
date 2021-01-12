import React from 'react';
import '../../style/ConfirmEmail.scss';

export default function ConfirmEmail({ history }) {
    const user = sessionStorage.getItem('user');

    if (!user) {
        history.push('/login');
    }

    return (
        <div className="confirm-email">
            <h1>Register Confirmation</h1>
            <p>Please check your email to confirm your account.</p>
        </div>
    );
}
