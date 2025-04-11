// /pages/Register.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../api/blogApi';
import { motion } from 'framer-motion';
import './rigister_login.css';

const Register = () => {
  const history = useHistory();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      history.push('/login');
    } catch (err) {
      setError('Registration failed. Try again.');
      console.error(err);
    }
  };

  return (
    <motion.div 
      className="form-container auth-form"
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Register 🧑‍💻</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit} className="blog-form">
        <label>Username</label>
        <input type="text" name="username" value={form.username} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />

        <button type="submit">🚀 Register</button>
      </form>
    </motion.div>
  );
};

export default Register;
