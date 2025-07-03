// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function Profile() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    phone: ''
  });

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return;
      const { data, error } = await supabase
        .from('Players')
        .select('*')
        .eq('UID', session.user.id)
        .single();

      if (data) {
        setProfile(data);
        setFormData({
          username: data.username || '',
          phone: data.phone || ''
        });
      } else {
        console.error('Failed to load profile:', error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [session]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!session?.user?.id) return;
    const { error } = await supabase
      .from('Players')
      .update(formData)
      .eq('UID', session.user.id);

    if (!error) {
      alert('Profile updated!');
    } else {
      console.error('Error updating profile:', error.message);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !session?.user?.id) return;

    setAvatarUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${session.user.id}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert('Upload failed.');
      setAvatarUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData?.publicUrl;

    const { error: updateError } = await supabase
      .from('Players')
      .update({ avatar_url: publicUrl })
      .eq('UID', session.user.id);

    if (!updateError) {
      setProfile({ ...profile, avatar_url: publicUrl });
      alert('Avatar updated!');
    } else {
      alert('Error saving avatar URL');
    }

    setAvatarUploading(false);
  };

  if (loading) return <div className="text-white p-6">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-3xl font-bold text-center mb-4">Your Profile</h2>

        <div className="flex justify-center">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full shadow" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-2xl">
              {profile?.username?.[0]?.toUpperCase() || '?'}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="text-sm mt-2"
            disabled={avatarUploading}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              className="w-full bg-gray-700 text-white rounded px-3 py-2"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              className="w-full bg-gray-700 text-white rounded px-3 py-2"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Email (read-only)</label>
            <input
              type="email"
              value={session?.user?.email}
              readOnly
              className="w-full bg-gray-600 text-white rounded px-3 py-2 opacity-70 cursor-not-allowed"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-300 mt-2">
            <p>Level: <span className="font-bold text-white">{profile?.level}</span></p>
            <p>XP: <span className="font-bold text-white">{profile?.xp}</span></p>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded text-white font-semibold mt-4"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
