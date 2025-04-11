// /pages/Login.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../api/blogApi';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import './rigister_login.css';

const Login = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      const userData = { username: form.username }; // optionally enrich this
      login(userData); // Save in context + localStorage
      localStorage.setItem('token', res.data); // still store token separately
      history.push('/blog'); // Now safely navigates
    } catch (err) {
      setError('Login failed. Check credentials.');
      console.error(err);
    }
  };

  return (
    <motion.div 
      className="form-container auth-form"
      initial={{ y: 20, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Login 🔐</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit} className="blog-form">
        <label>Username</label>
        <input type="text" name="username" value={form.username} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />

        <button type="submit">🔓 Login</button>
      </form>
    </motion.div>
  );
};

export default Login;
