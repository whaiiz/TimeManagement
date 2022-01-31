import React from 'react';

export default function RegisterForm() {
    return (
        <form className="">
            <article>
                <label htmlFor="email">Email</label>
                <input type="text" id="username" />
            </article>
            <article>
                <label htmlFor='username'>Username</label>
                <input type="text" id="username" />
            </article>
            <article>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
            </article>
            <article>
                <label>Confirm password</label>
                <input type="password" id="confirmPassword" />
            </article>
        </form>
    );
}