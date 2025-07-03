// src/components/Layout.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Menu, X } from 'lucide-react';

function Layout({ children }) {
  const [session, setSession] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // Don’t render any nav for unauthenticated users
  if (!session) return <main className="flex-1">{children}</main>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="sticky top-0 z-50 bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-purple-400">CyberQuest</Link>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <nav className="hidden md:flex gap-4 items-center">
            <Link to="/" className={`hover:text-purple-400 ${location.pathname === '/' ? 'text-purple-400' : ''}`}>
              Home
            </Link>
            <Link to="/leaderboard" className={`hover:text-purple-400 ${location.pathname === '/leaderboard' ? 'text-purple-400' : ''}`}>
              Leaderboard
            </Link>
            <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
          </nav>
        </div>

        {isOpen && (
          <nav className="md:hidden flex flex-col gap-2 px-4 pb-4 animate-slide-down">
            <Link to="/" onClick={toggleMenu} className="hover:text-purple-400">Home</Link>
            <Link to="/leaderboard" onClick={toggleMenu} className="hover:text-purple-400">Leaderboard</Link>
            <button onClick={handleLogout} className="hover:text-red-400 text-left">Logout</button>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}

export default Layout;
