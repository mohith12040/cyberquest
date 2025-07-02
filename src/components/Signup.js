import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) navigate('/');
    else alert(error.message);
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 bg-gray-800" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 bg-gray-800" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
