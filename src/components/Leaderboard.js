// src/components/Leaderboard.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      if (!user) return;

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
      setLoading(false);
    };

    fetchLeaderboard();

    const interval = setInterval(fetchLeaderboard, 3000); // refresh every 3s
    return () => clearInterval(interval);
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-900 text-white px-4 py-8 flex flex-col items-center"
    >
      <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">🏆 CyberQuest Leaderboard</h2>

        {currentPlayer && (
          <div className="mb-6 bg-gray-700 p-4 rounded shadow text-center">
            <p className="text-purple-300 font-semibold text-lg">
              You: {currentPlayer.username} — Rank #{userRank}
            </p>
            <p className="text-sm text-gray-400">Level {currentPlayer.level} | XP: {currentPlayer.xp}</p>
            <div className="h-2 bg-gray-600 rounded mt-2 overflow-hidden">
              <div
                className="bg-green-500 h-2 rounded transition-all duration-700 ease-out"
                style={{ width: `${getXPProgressPercent(currentPlayer.level, currentPlayer.xp)}%` }}
              />
            </div>
          </div>
        )}

        <ul className="space-y-4">
          {players.map((player, index) => (
            <li key={player.id} className="bg-gray-700 p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-purple-200">
                    #{index + 1} {player.username}
                  </span>
                  <p className="text-sm text-gray-300">Level {player.level} • XP: {player.xp}</p>
                </div>
                <div className="w-32 h-2 bg-gray-600 rounded ml-4 overflow-hidden">
                  <div
                    className="bg-blue-500 h-2 rounded transition-all duration-700 ease-out"
                    style={{
                      width: `${getXPProgressPercent(player.level, player.xp)}%`,
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

        {loading && <p className="mt-4 text-gray-400 text-sm text-center">Refreshing leaderboard...</p>}
      </div>
    </motion.div>
  );
}

export default Leaderboard;
