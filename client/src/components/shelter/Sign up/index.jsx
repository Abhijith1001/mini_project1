import React, { useState } from 'react';
import axios from 'axios';
import { Link,Navigate } from 'react-router-dom';
import styles from './styles.module.css';

const ShelterSignup = () => {

  const [data, setData] = useState({
    shelterName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  // const [msg, setMsg] = useState('');

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/shelterUser/signup';
      const response = await axios.post(url, data);
      //setMsg(response.data.message);
      <Navigate to="/shelterlogin" /> ;

    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/shelterlogin">
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
              placeholder="Shelter Name"
              name="shelterName"
              value={data.shelterName}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {/*  {msg && <div className={styles.success_msg}>{msg}</div>} */}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShelterSignup;
