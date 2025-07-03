// src/components/Signup.js

import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // 1. Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (!user) {
      alert("Signup succeeded, but user data is missing. Try logging in.");
      return;
    }

    // 2. Insert into Players table with full schema
    const { error: insertError } = await supabase.from('Players').insert([
      {
        id: user.id,              // UUID - matches auth.users.id
        username,                 // chosen username
        email,                    // email
        level: 1,                 // default level
        xp: 0,                    // default xp
        created_at: new Date(),   // created timestamp
        updated_at: new Date(),   // updated timestamp
      }
    ]);

    if (insertError) {
      console.error('Insert error:', insertError.message);
      alert('Database error: ' + insertError.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto text-white py-8">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="space-y-4 bg-gray-800 p-6 rounded">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 rounded bg-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded font-semibold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
