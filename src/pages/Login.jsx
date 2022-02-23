import React from 'react';
import LoginForm from '../components/authentication/LoginForm';
import '../styles/pages/login.css';

export default function Login() {
    return (
        <section className="login-container">
            <LoginForm />
        </section>
    )
}

