import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css'; 
const Signup = () => {
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '', 
	});
	const [error, setError] = useState('');
	const [errors, setErrors] = useState({ email: "", password: "" });
	const [msg, setMsg] = useState('');
	const [isSending, setIsSending] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({ ...prevData, [name]: value }));
		validateField(name, value);
	};
	const validateField = (name, value) => {
		let errorMessage = "";

		if (name === "email") {
			const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			if (!emailRegex.test(value)) {
				errorMessage = "Invalid email format";
			}

		}

		if (name === "password") {
			if (value.length < 8) {
				errorMessage = "Password must be at least 8 characters long";
			} else if (!/\d/.test(value)) {
				errorMessage = "Password must contain at least one digit";
			} else if (!/[a-zA-Z]/.test(value)) {
				errorMessage = "Password must contain at least one letter";
			} else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-=/]/.test(value)) {
				errorMessage = "Password must contain at least one special character";
			}
		}


		setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSending(true);
		try {
			if (data.password !== data.confirmPassword) {
				setError('Passwords do not match');
				setIsSending(false);
				return;
			}

			const url = 'http://localhost:8080/api/users';
			const { data: res } = await axios.post(url, data);
			setMsg(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
		setIsSending(false);
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						{errors.email && <div className={styles.error_msg}>{errors.email}</div>}
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{errors.password && <div className={styles.error_msg}>{errors.password}</div>}
						<input
							type="password"
							placeholder="Confirm Password"
							name="confirmPassword"
							onChange={handleChange}
							value={data.confirmPassword}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
						{isSending && (
							<div className={styles.sending_popup}>Sending Email...</div>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
