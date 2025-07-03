// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Home from './pages/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';
import Layout from './components/Layout';
import RPGDashboard from './pages/RPGDashboard';
import PhishingQuest from './pages/PhishingQuest';
import { AnimatePresence } from 'framer-motion';

import './index.css'; // Ensure Tailwind + global styles are applied

function AnimatedRoutes({ session }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={session ? <Home session={session} /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leaderboard" element={session ? <Leaderboard /> : <Navigate to="/login" />} />
        <Route path="/rpg/:id" element={session ? <RPGDashboard /> : <Navigate to="/login" />} />
        <Route path="/phishing" element={session ? <PhishingQuest session={session} /> : <Navigate to="/login" />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [session, setSession] = useState(null);

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

  return (
    <Router>
      <Layout>
        <AnimatedRoutes session={session} />
      </Layout>
    </Router>
  );
}

export default App;
