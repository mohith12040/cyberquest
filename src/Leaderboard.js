import React from 'react';

function Leaderboard() {
  const players = [
    { name: 'Alice', level: 8 },
    { name: 'Bob', level: 6 },
    { name: 'Charlie', level: 4 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul className="space-y-2">
        {players.map((player, i) => (
          <li key={i} className="bg-gray-800 p-4 rounded">
            {i + 1}. {player.name} - Level {player.level}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;

