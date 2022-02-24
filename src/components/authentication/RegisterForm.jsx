import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/components/authentication/register-form.css';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { register as handleRegister} from '../../business-layer/authentication';
import { successMessage, errorMessage } from '../../utils/sweet-alert';
import Loading from '../../components/common/Loading';

export default function RegisterForm() {
    const [isPageLoading, setIsPageLoading] = useState(false);

    // move this to a different file
    const schema = yup.object({
        username: yup.string().required("Username is mandatory").max(20, 'Username can\'t have more than 20 digits'),
        email: yup.string().required("Email is mandatory")
            .max(50, 'Email can\'t have more than 50 digits')
            .email('Invalid email format'),
        password: yup.string().required("Password is mandatory")
            .min(8, 'Passwords should at least have 8 characters')
            .max(50, 'Password can\'t have more than 50 digits'),
        confirmPassword: yup.string().required("Please confirm your password")
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .max(50, 'Password can\'t have more than 50 digits'),
    });

    let { register, formState: { errors }, handleSubmit, getValues } = useForm({
        defaultValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(schema)
    });

    let handleRegistration = async _ => {
        let user = getValues();

        setIsPageLoading(true);

        let { success, message } = await handleRegister(user);

        if (success) successMessage('Success', message).then(_ => window.location.href = '/Login');
        else errorMessage('Error', message);

        setIsPageLoading(false);
    }

    return (
        <React.Fragment> 
            { isPageLoading ? <Loading /> : ""}
            <form className="register-form">
                <h1>Register</h1>
                <article>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" placeholder="randomemail@hotmail.com"
                        className={errors.email?.message ? "invalid-input" : ""} {...register("email")}/>
                    <label className="error-text">{errors.email?.message}</label>
                </article>
                <article>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="anonymouse" 
                        className={errors.email?.message ? "invalid-input" : ""} {...register("username")} />
                    <label className="error-text">{errors.username?.message}</label>
                </article>
                <article>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="$uper$ecurePaASSw0Rd" 
                        className={errors.password?.message ? "invalid-input" : ""} {...register("password")}/>
                    <label className="error-text">{errors.password?.message}</label>
                </article>
                <article>
                    <label>Confirm password</label>
                    <input type="password" id="confirmPassword" placeholder="$uper$ecurePaASSw0Rd" 
                        className={errors.confirmPassword?.message ? "invalid-input" : ""} {...register("confirmPassword")}/>
                    <label className="error-text">{errors.confirmPassword?.message}</label>
                </article>
                <button className="register-button" type="submit" onClick={handleSubmit(handleRegistration)}>Register</button>
                <a className="login" href="/Login">Already have an account? 
                    Click here to log in</a>
            </form>
        </React.Fragment>
    );
}