import React, {useState} from 'react';
import '../../styles/components/authentication/forgot-password-form.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { successMessage, errorMessage } from '../../utils/sweet-alert';
import { forgotPassword } from '../../business-layer/authentication';
import Loading from '../../components/common/Loading';

export default function ForgotPasswordForm() {
    const [isPageLoading, setIsPageLoading] = useState(false);

    const schema = yup.object({
        email: yup.string().required("Email is mandatory")
            .max(50, 'Email can\'t have more than 50 digits')
            .email('Invalid email format'),
    });

    const { register, formState: { errors }, handleSubmit, getValues } = useForm({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(schema)
    });

    const handleForgotPassword = async _ => {
        let { email } = getValues();

        setIsPageLoading(true);

        let { success, message } = await forgotPassword(email);

        setIsPageLoading(false);

        if (success) {
            successMessage('Success', 
                'It was sent an email for resetting password').then(_ => window.location.href = '/Login');
            return;            
        }

        errorMessage('Error', message);
    };

    return (
        <React.Fragment>
            {isPageLoading ? <Loading/> : ""}
            <form className="forgot-password-form">
                <h1>Forgot password</h1>
                <article>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" placeholder="randomemail@hotmail.com"  
                        className={errors.email?.message ? "invalid-input" : ""} {...register("email")}/>
                    <label className="error-text">{errors.email?.message}</label>
                </article>
                <button className="send-email-button" type="submit" 
                    onClick={handleSubmit(handleForgotPassword)}>Send email</button>
                <a className="login" href="/Login">Go back to login</a>
            </form>
        </React.Fragment>
    );
}
