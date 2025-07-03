// src/components/Signup.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { motion } from 'framer-motion';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', phone: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const validatePhone = (phone) => /^\+?[1-9]\d{9,14}$/.test(phone);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.username.trim()) return setErrorMsg('Username is required');
    if (!validatePhone(form.phone)) return setErrorMsg('Enter a valid phone number (e.g., +91XXXXXXXXXX)');
    if (!form.email.includes('@')) return setErrorMsg('Enter a valid email');
    if (form.password.length < 6) return setErrorMsg('Password must be at least 6 characters');

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) return setErrorMsg(error.message);
    const userId = data.user?.id;
    if (!userId) return setErrorMsg('Signup failed. No user ID returned.');

    const { error: insertError } = await supabase.from('Players').insert([
      {
        id: userId,
        username: form.username,
        phone: form.phone,
        email: form.email,
        xp: 0,
        level: 1,
      }
    ]);

    if (insertError) return setErrorMsg('Error saving profile: ' + insertError.message);
    navigate('/');
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">🎮 Join CyberQuest</h2>
        {errorMsg && <p className="text-red-400 mb-2 text-center">{errorMsg}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-gray-800 rounded"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="+91XXXXXXXXXX"
            className="w-full p-3 bg-gray-800 rounded"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-800 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-800 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded font-semibold">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400 text-center">
          Already have an account? <Link to="/login" className="text-purple-300 underline">Log in</Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}

export default Signup;
