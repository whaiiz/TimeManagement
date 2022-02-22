import React, {useState} from 'react';
import '../../styles/login-form.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { errorMessage } from '../../utils/sweet-alert';
import { login } from '../../business-layer/authentication';
import Loading from '../../components/common/Loading';

export default function LoginForm() {
    const [isPageLoading, setIsPageLoading] = useState(false);

    const schema = yup.object({
        username: yup.string().required("Please insert your username"),
        password: yup.string().required("Please insert your password")
    });

    let { register, formState: { errors }, handleSubmit, getValues } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(schema)
    });

    const handleLogin = async _ => {
        let { username, password } = getValues();

        setIsPageLoading(true);

        let { isLoggedIn, message } = await login(username, password);
        
        setIsPageLoading(false);

        if (isLoggedIn) window.location.href = '/';
        else errorMessage('Error', message);
    }

    return (
        <React.Fragment>
            { isPageLoading ? <Loading /> : "" }  
            <form className="login-form">
                <h1 className="login-title">Login</h1>
                <article className="username-container">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" className="username" {...register("username")}
                        placeholder="anonymouse" autoComplete="on"/>
                    <label className="error-text">{errors.username?.message}</label>
                </article>
                <article className="password-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="password" {...register("password")}
                        placeholder="$uper$ecurePaASSw0Rd" autoComplete="on"/>
                    <a className="forgot-password" href="/ForgotPassword">Forgot password? Click here.</a>
                    <label className="error-text">{errors.password?.message}</label>
                </article>
                <button className="login-button" type="submit" onClick={handleSubmit(handleLogin)}>Log in</button>
                <a className="register" href="/Register">No account? Click here to register.</a>
            </form>
        </React.Fragment>
    );
}
