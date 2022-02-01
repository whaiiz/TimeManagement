import React from 'react';
import RegisterForm from '../components/RegisterForm';
import '../styles/register.css';
import * as yup from "yup";

export default function Register() {
	return (
		<main className="register-container">
			<RegisterForm/>
		</main>
	)
}
