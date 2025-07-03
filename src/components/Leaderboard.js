// src/components/Leaderboard.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      if (!user) return;
      setCurrentUser(user);

      const { data, error } = await supabase
        .from('Players')
        .select('id, username, level, xp')
        .order('xp', { ascending: false });

      if (!error && data) {
        setPlayers(data);
        const index = data.findIndex((p) => p.id === user.id);
        if (index !== -1) {
          setCurrentPlayer(data[index]);
          setUserRank(index + 1);
        }
      } else {
        console.error('Failed to fetch leaderboard:', error?.message);
      }
    };

    fetchLeaderboard();
  }, []);

  const getXPForNextLevel = (level) => level * 100;
  const getXPProgressPercent = (level, xp) => {
    const totalXP = getXPForNextLevel(level);
    const baseXP = getXPForNextLevel(level - 1);
    const progress = ((xp - baseXP) / (totalXP - baseXP)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white px-4 py-8 flex flex-col items-center"
    >
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">🏆 CyberQuest Leaderboard</h2>

        {currentPlayer && (
          <motion.div
            className="mb-8 bg-gradient-to-r from-purple-700 to-purple-900 p-4 rounded-xl text-center shadow-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-white font-semibold text-lg">
              You: <span className="text-yellow-300">{currentPlayer.username}</span> — Rank #{userRank}
            </p>
            <p className="text-sm text-gray-300 mt-1">Level {currentPlayer.level} | XP: {currentPlayer.xp}</p>
            <div className="h-3 mt-2 bg-gray-700 rounded overflow-hidden">
              <motion.div
                className="h-3 rounded bg-gradient-to-r from-green-400 via-yellow-300 to-red-500"
                initial={{ width: 0 }}
                animate={{ width: `${getXPProgressPercent(currentPlayer.level, currentPlayer.xp)}%` }}
                transition={{ duration: 1.2 }}
              />
            </div>
          </motion.div>
        )}

        <ul className="space-y-4">
          {players.map((player, index) => (
            <motion.li
              key={player.id}
              className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-purple-300">
                    #{index + 1} {player.username}
                  </span>
                  <p className="text-sm text-gray-300">Level {player.level} • XP: {player.xp}</p>
                </div>
                <div className="w-32 h-2 bg-gray-600 rounded ml-4 overflow-hidden">
                  <motion.div
                    className="h-2 rounded bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${getXPProgressPercent(player.level, player.xp)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default Leaderboard;
