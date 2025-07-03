// src/components/Login.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) navigate('/');
    else setErrorMsg(error.message);
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">🔐 Cyber Quest</h2>
      {errorMsg && <p className="text-red-400 mb-2 text-center">{errorMsg}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-800 rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-800 rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded font-semibold">
          Log In
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-400 text-center">
        Don’t have an account? <Link to="/signup" className="text-purple-300 underline">Sign up</Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
