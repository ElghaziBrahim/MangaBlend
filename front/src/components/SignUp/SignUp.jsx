// SignUp.js
import React from 'react';
import styles from './signUp.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const SignUp = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password2, setPassword2] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const AddUser = async (user) => {
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.message === "worked") {
        navigate("/login");
      } else {
        console.log("signup failed");
        /* setErrorLogin(true); */
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
      password2
    }
    AddUser(user)
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label htmlFor="gmail">Email:</label>
        <input type="email" id="gmail" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" onChange={(e) => setPassword2(e.target.value)} value={password2} required />

        <input type="submit" value="Sign Up" />

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
