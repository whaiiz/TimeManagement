import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import '../../styles/reset-password-form.css';
import { resetPassword } from '../../business-layer/authentication';
import Loading from '../../components/common/Loading';
import { errorMessage, successMessage } from '../../utils/sweet-alert';


export default function ResetPasswordForm() {
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [token, setToken] = useState("");

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
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(schema)
    });

    let handleResetPassword = async _ => {
        let { password } = getValues();

        setIsPageLoading(true);

        let { success, message } = await resetPassword(password, token);

        setIsPageLoading(false);

        if (success) {
            successMessage('Success', 'Password changed with success!').then(_ => window.location.href = '/Login');
            return;
        }

        errorMessage('Error', message);
    }
    
    useEffect(() => {
        let url = new URL(window.location.href);
        let searchParams = new URLSearchParams(url.search);
        let tokenParam = searchParams.get('token');

        if (!tokenParam) window.location.href = '/Login';
        else setToken(tokenParam)
    }, [])
    
    return (
        <React.Fragment>
            {isPageLoading ? <Loading/> : ""}
            <form className="reset-password-form">
                <h1>Reset password</h1>
                <article>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="$uper$ecurePaASSw0Rd" {...register("password")} />
                    <label className="error-text">{errors.password?.message}</label>
                </article>
                <article>
                    <label htmlFor="confirm-password">Confirm password</label>
                    <input type="password" id="confirm-password" placeholder="$uper$ecurePaASSw0Rd" {...register("confirmPassword")} />
                    <label className="error-text">{errors.confirmPassword?.message}</label>
                </article>
                <button className="reset-password-button" type="submit" onClick={handleSubmit(handleResetPassword)}>
                    Reset password</button>
            </form> 
        </React.Fragment>
    )
}
