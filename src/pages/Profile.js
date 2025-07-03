// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function Profile({ session }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('Players')
        .select('username, email, phone, level, xp, avatar_url')
        .eq('UID', session.user.id)
        .single();

      if (data) setProfile(data);
      else console.error('Profile fetch error:', error?.message);
      setLoading(false);
    };

    if (session?.user?.id) {
      fetchProfile();
    }
  }, [session]);

  if (loading) {
    return <div className="text-white p-6 text-center">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="text-red-500 p-6 text-center">Profile not found.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 py-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-2 border-purple-500"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-purple-600 text-3xl font-bold">
              {profile.username?.[0]?.toUpperCase() || '?'}
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-2">{profile.username}</h2>
        <p className="text-sm text-gray-400 mb-4">{profile.email}</p>

        <div className="space-y-2 text-left">
          <p><strong>📞 Phone:</strong> {profile.phone || 'Not provided'}</p>
          <p><strong>🏆 Level:</strong> {profile.level}</p>
          <p><strong>⭐ XP:</strong> {profile.xp}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
