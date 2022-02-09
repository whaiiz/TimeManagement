import React from 'react';
import ForgotPasswordForm from '../components/authentication/ForgotPasswordForm';
import '../styles/forgot-password.css';

export default function ForgotPassword() {
	return (
		<section className="forgot-password-container">
			<ForgotPasswordForm/>
		</section>		
	);
}
