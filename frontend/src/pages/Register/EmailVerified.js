import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

export default function EmailVerified() {
    const [warningMsg, setWarningMsg] = useState('');
    const [userName, setUserName] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const { token } = useParams();

    // CDM
    useEffect(() => {
        handleEmailVerification();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEmailVerification = async () => {
        try {
            const response = await api.get('/user/verify-email', {
                headers: { email_token: token },
            });

            setIsVerified(true);
            setUserName(response.data.name);
        } catch (error) {
            setWarningMsg(error.response.data.message);
        }
    };

    return (
        <div className="email-verified">
            {isVerified ? (
                <div>
                    <h1>Email Confirmation Successful</h1>
                    <p>Welcome to I Am Busy! {userName}</p>
                    <p>
                        You can now <a href="/login">login</a> to your account!
                    </p>
                </div>
            ) : (
                <div>
                    <h1>Email Confirmation Failure</h1>
                    <p>{warningMsg}</p>
                </div>
            )}
        </div>
    );
}
