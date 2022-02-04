import React from 'react';
import '../styles/forgot-password-form.css';

export default function ForgotPasswordForm() {
    return (
        <form className="forgot-password-form">
            <h1>Forgot password</h1>
            <article>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" placeholder="randomemail@hotmail.com" />
            </article>
            <button className="send-email-button" type="submit">Send email</button>
            <a className="login" href="/">Go back to login</a>
        </form>
    );
}
