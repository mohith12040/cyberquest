// src/components/Leaderboard.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

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
        const userOnlyData = data.filter((p) => p.id === user.id || p.username); // ensures current user + valid usernames
        setPlayers(userOnlyData);

        const index = userOnlyData.findIndex((p) => p.id === user.id);
        if (index !== -1) {
          setCurrentPlayer(userOnlyData[index]);
          setUserRank(index + 1);
        }
      } else {
        console.error('Failed to fetch leaderboard:', error?.message);
      }
    };

    fetchLeaderboard();
  }, []);

  // Dynamic XP needed for each level (Level 1: 60, Level 2: 120, etc.)
  const getXPForLevel = (level) => level * 60;

  const getXPProgressPercent = (level, xp) => {
    const xpThisLevelStart = getXPForLevel(level - 1);
    const xpNextLevel = getXPForLevel(level);
    const currentXP = xp - xpThisLevelStart;
    const totalXPForLevel = xpNextLevel - xpThisLevelStart;
    return Math.min((currentXP / totalXPForLevel) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10 flex flex-col items-center">
      <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-300">🏆 CyberQuest Leaderboard</h2>

        {currentPlayer && (
          <div className="mb-6 bg-gray-700 p-4 rounded shadow text-center">
            <p className="text-purple-300 font-semibold text-lg">
              You: {currentPlayer.username} — Rank #{userRank}
            </p>
            <p className="text-sm text-gray-400">Level {currentPlayer.level} | XP: {currentPlayer.xp}</p>
            <div className="h-2 bg-gray-600 rounded mt-2 overflow-hidden">
              <div
                className="bg-green-500 h-2 rounded transition-all duration-700 ease-out"
                style={{
                  width: `${getXPProgressPercent(currentPlayer.level, currentPlayer.xp)}%`,
                }}
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
      </div>
    </div>
  );
}

export default Leaderboard;
