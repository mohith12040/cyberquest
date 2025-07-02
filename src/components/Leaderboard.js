import React from 'react';

const Leaderboard = () => {
  const players = [
    { name: 'Alice', level: 10 },
    { name: 'Bob', level: 8 },
    { name: 'Charlie', level: 6 },
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul className="space-y-2">
        {players.map((player, index) => (
          <li key={index} className="bg-gray-800 p-4 rounded">
            {index + 1}. {player.name} - Level {player.level}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
