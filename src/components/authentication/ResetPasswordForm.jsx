import React from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import '../../styles/reset-password-form.css'

export default function ResetPasswordForm() {
    const schema = yup.object({
        password: yup.string().required("Password is mandatory")
            .min(8, 'Passwords should at least have 8 characters')
            .max(50, 'Password can\'t have more than 50 digits'),
        confirmPassword: yup.string().required("Please confirm your password")
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .max(50, 'Password can\'t have more than 50 digits'),
    });

    const { register, formState: { errors }, handleSubmit, getValues } = useForm({
        defaultValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(schema)
    });

    let handleResetPassword = () => {
        let { password, confirmPassword } = getValues();
    }

    return (
        <form className="reset-password-form">
            <h1>Reset password</h1>
            <article>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" placeholder="$uper$ecurePaASSw0Rd" {...register("password")} />
                <label className="error-text">{errors.email?.message}</label>
            </article>
            <article>
                <label htmlFor="confirm-password">Confirm password</label>
                <input type="text" id="confirm-password" placeholder="$uper$ecurePaASSw0Rd" {...register("confirmPassword")} />
            </article>
            <button className="reset-password-button" type="submit" onClick={handleSubmit(handleResetPassword)}>
                Reset password</button>
        </form> 
    )
}
