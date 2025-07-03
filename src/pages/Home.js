// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';

const quests = [
  {
    id: 1,
    title: 'Spot the Phish',
    description: 'Learn to identify phishing scams and protect your inbox.'
  },
  {
    id: 2,
    title: 'Networking Basics',
    description: 'Understand OSI & TCP/IP models and core network concepts.'
  }
];

function Home({ session }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUsername = async () => {
      const { data, error } = await supabase
        .from('Players')
        .select('username')
        .eq('id', session.user.id)
        .single();

      if (data) {
        setUsername(data.username);
      } else {
        console.error('Error fetching username:', error?.message);
      }
    };

    getUsername();
  }, [session]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-4 py-8 text-white min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    >
      <h1 className="text-4xl font-bold mb-2">Welcome to CyberQuest</h1>
      <p className="text-gray-400 mb-6">
        Logged in as <span className="text-white font-semibold">{username || session.user.email}</span>
      </p>

      <h2 className="text-2xl font-semibold mb-4">Available Quests</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {quests.map((quest) => (
          <Link
            key={quest.id}
            to={`/rpg/${quest.id}`}
            className="block bg-gray-800 rounded p-4 shadow hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            <h3 className="text-xl font-bold mb-1 text-purple-300">{quest.title}</h3>
            <p className="text-sm text-gray-300">{quest.description}</p>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default Home;
