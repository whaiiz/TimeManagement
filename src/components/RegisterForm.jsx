import React from 'react';
import '../styles/register-form.css'

export default function RegisterForm() {
    return (
        <form className="register-form">
            <h1>Register</h1>
            <article>
                <label htmlFor="email">Email</label>
                <input type="text" id="username" placeholder="randomemail@hotmail.com"/>
            </article>
            <article>
                <label htmlFor='username'>Username</label>
                <input type="text" id="email" placeholder="anonymouse" />
            </article>
            <article>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="$uper$ecurePaASSw0Rd" />
            </article>
            <article>
                <label>Confirm password</label>
                <input type="password" id="confirmPassword" placeholder="$uper$ecurePaASSw0Rd" />
            </article>
            <button className="register-button" type="submit">Register</button>
            <a className="login" href="/">Already have an account? 
                Click here to log in</a>
        </form>
    );
}