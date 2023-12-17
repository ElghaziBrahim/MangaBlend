// SignUp.js
import React from 'react';
import styles from './signUp.module.css';

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-up logic here
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} action="/signup" method="post" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="gmail">Email:</label>
        <input type="email" id="gmail" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required />

        <input type="submit" value="Sign Up" />

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
