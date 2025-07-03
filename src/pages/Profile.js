// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function Profile({ session }) {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session || !session.user) return;

      const { data, error } = await supabase
        .from('Players')
        .select('username, email, xp, level, phone, avatar_url')
        .eq('id', session.user.id)
        .single();

      if (error) console.error('Error fetching profile:', error.message);
      else setPlayer(data);

      setLoading(false);
    };

    fetchProfile();
  }, [session]);

  if (loading) return <div className="text-white p-4">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          {player?.avatar_url ? (
            <img
              src={player.avatar_url}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold">
              {player?.username?.[0]?.toUpperCase() || 'U'}
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold">{player?.username}</h2>
            <p className="text-gray-400 text-sm">{player?.email}</p>
            {player?.phone && <p className="text-sm text-gray-400">📞 {player.phone}</p>}
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <p>Level: <span className="font-semibold">{player?.level}</span></p>
          <p>XP: <span className="font-semibold">{player?.xp}</span></p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
