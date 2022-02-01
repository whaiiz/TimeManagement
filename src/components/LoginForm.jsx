import React from 'react';
import '../styles/login-form.css'

export default function LoginForm() {
    return (
        <form className="login-form">
            <h1 className="login-title">Login</h1>
            <article className="username-container">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" className="username" 
                    placeholder="anonymouse" autoComplete="on"/>
            </article>
            <article className="password-container">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="username" 
                    placeholder="$uper$ecurePaASSw0Rd" autoComplete="on"/>
                <a className="forgot-password" 
                    href="/ForgotPassword">Forgot password? Click here.</a>
            </article>
            <button className="login-button" type="submit">Log in</button>
            <a className="register" href="/Register">
                No account? Click here to register</a>
        </form>
    )
}
