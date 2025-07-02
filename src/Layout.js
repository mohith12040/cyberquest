import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <nav className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold">CyberQuest</div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Layout;

