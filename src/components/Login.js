import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

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
    <div className="max-w-md mx-auto mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {errorMsg && <p className="text-red-400 mb-2">{errorMsg}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 bg-gray-800" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 bg-gray-800" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Login</button>
      </form>
      <p className="mt-4 text-sm text-gray-400">
        Don’t have an account? <Link to="/signup" className="text-purple-400 underline">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
