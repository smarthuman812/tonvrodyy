import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

interface Profile {
  id: string;
  telegram_id: number;
  username: string;
  avatar_url: string;
  wallet: string | null;
  referral_code: string;
  created_at: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const userId =
    localStorage.getItem('user_id') ||
    '00000000-0000-0000-0000-000000000000';

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getProfile(userId);
        setProfile(data as Profile);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [userId]);

  if (!profile) {
    return <p>Loading profile...</p>;
  }
  return (
    <div>
      <h2>Your Profile</h2>
      <img
        src={profile.avatar_url || 'https://placehold.co/64x64'}
        alt={profile.username}
        width={64}
        height={64}
      />
      <p>
        <strong>Username:</strong> {profile.username || 'Anonymous'}
      </p>
      <p>
        <strong>Wallet:</strong> {profile.wallet || 'Not linked'}
      </p>
      <p>
        <strong>Referral code:</strong> {profile.referral_code}
      </p>
      <p>
        <strong>Joined at:</strong>{' '}
        {new Date(profile.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default ProfilePage;
