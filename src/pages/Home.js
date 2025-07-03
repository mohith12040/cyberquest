import React from 'react';
import { Link } from 'react-router-dom';

const quests = [
  {
    id: 1,
    title: 'Spot the Phish',
    description: 'Learn to identify phishing scams and protect your inbox.'
  },
  {
    id: 2,
    title: 'Password Cracker',
    description: 'Understand how passwords are attacked and how to make them secure.'
  },
  {
    id: 4,
    title: 'SQLi: Break the Database',
    description: 'Explore SQL Injection and how to defend against it.'
  },
  {
    id: 5,
    title: 'Find the Open Ports',
    description: 'Use scanning tools to discover vulnerable network services.'
  },
  {
    id: 6,
    title: 'XSS Cleanup Mission',
    description: 'Learn how cross-site scripting attacks work and how to neutralize them.'
  },
  {
    id: 7,
    title: 'Firewall Rules Master',
    description: 'Set up and test firewall rules to block malicious traffic.'
  }
];

function Home({ session }) {
  return (
    <div className="px-4 py-8 text-white min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-4xl font-bold mb-2">Welcome to CyberQuest</h1>
      <p className="text-gray-400 mb-6">Logged in as {session.user.email}</p>

      <h2 className="text-2xl font-semibold mb-4">Available Quests</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {quests.map((quest) => (
          <Link
            key={quest.id}
            to={quest.id === 1 ? '/rpg/1' : `/rpg/${quest.id}`}
            className="block bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition-all hover:bg-purple-700/20"
          >
            <h3 className="text-xl font-bold mb-1">{quest.title}</h3>
            <p className="text-sm text-gray-300">{quest.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
