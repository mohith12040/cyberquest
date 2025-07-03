// src/components/Layout.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Menu, X } from 'lucide-react';

function Layout({ children }) {
  const [session, setSession] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user) {
        const { data } = await supabase
          .from('Players')
          .select('username, avatar_url')
          .eq('id', session.user.id)
          .single();
        setProfile(data);
      }
    };
    fetchProfile();
  }, [session]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="sticky top-0 z-50 bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-purple-400">CyberQuest</Link>
          {session ? (
            <>
              <div className="md:hidden">
                <button onClick={toggleMenu} className="focus:outline-none">
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
              <nav className="hidden md:flex gap-4 items-center">
                <Link to="/" className="hover:text-purple-400">Home</Link>
                <Link to="/leaderboard" className="hover:text-purple-400">Leaderboard</Link>
                <Link to="/profile" className="hover:text-purple-400 flex items-center gap-2">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Avatar"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <span className="bg-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {profile?.username?.[0] || '?'}
                    </span>
                  )}
                  Profile
                </Link>
                <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
              </nav>
            </>
          ) : null}
        </div>
        {session && isOpen && (
          <nav className="md:hidden flex flex-col gap-2 px-4 pb-4 animate-slide-down">
            <Link to="/" className="hover:text-purple-400" onClick={toggleMenu}>Home</Link>
            <Link to="/leaderboard" className="hover:text-purple-400" onClick={toggleMenu}>Leaderboard</Link>
            <Link to="/profile" className="hover:text-purple-400" onClick={toggleMenu}>Profile</Link>
            <button onClick={handleLogout} className="hover:text-red-400 text-left">Logout</button>
          </nav>
        )}
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default Layout;
