import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const sampleChallenges = [
  {
    id: 1,
    title: 'Spot the Phish',
    description: 'Identify 3 phishing emails from real-world samples.',
    xp: 50,
    topic: 'Phishing'
  },
  {
    id: 2,
    title: 'Crack the Cipher',
    description: 'Decrypt a Caesar cipher message.',
    xp: 75,
    topic: 'Cryptography'
  },
  {
    id: 3,
    title: 'Secure the Network',
    description: 'Set up firewall rules to block common ports.',
    xp: 100,
    topic: 'Firewalls'
  }
];

const RPGDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setProfile(data);
        setXp(data.xp || 0);
        setCompleted(data.completed_challenges || []);
      }
    };
    fetchProfile();
  }, []);

  const handleComplete = async (challenge) => {
    if (completed.includes(challenge.id)) return;
    const newXp = xp + challenge.xp;
    const newCompleted = [...completed, challenge.id];

    setXp(newXp);
    setCompleted(newCompleted);

    await supabase.from('profiles').update({
      xp: newXp,
      completed_challenges: newCompleted
    }).eq('id', profile.id);
  };

  return (
    <div className="max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome, Agent {profile?.email}</h1>
      <p className="mb-6">XP: <strong>{xp}</strong></p>

      <h2 className="text-2xl font-semibold mb-2">Quests</h2>
      <div className="space-y-4">
        {sampleChallenges.map((ch) => (
          <div key={ch.id} className="bg-gray-800 p-4 rounded">
            <h3 className="text-xl font-bold">{ch.title}</h3>
            <p>{ch.description}</p>
            <p className="text-sm text-gray-400">Topic: {ch.topic} • XP: {ch.xp}</p>
            <button
              disabled={completed.includes(ch.id)}
              onClick={() => handleComplete(ch)}
              className={`mt-2 px-4 py-1 rounded ${completed.includes(ch.id) ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {completed.includes(ch.id) ? 'Completed' : 'Complete Quest'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RPGDashboard;

