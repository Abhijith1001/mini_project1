import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";


const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [isSending, setIsSending] = useState(false);


	const handleChange = ({ currentTarget: input }) => {
		const { name, value } = input;
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
		setIsSending(true)
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
		setIsSending(false)

	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
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
						<Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "0 15px" }}>Forgot Password ?</p>
						</Link>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
						{isSending && (
							<div className={styles.sending_popup}>Sending Email...</div>
						)}
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
