import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

interface Referral {
  childId: string;
  level: number;
}

/**
 * Referrals page shows your referral code and users you have referred.
 */
const ReferralsPage: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [list, setList] = useState<Referral[]>([]);
  const userId = localStorage.getItem('user_id') || '00000000-0000-0000-0000-000000000000';

  useEffect(() => {
    async function load() {
      try {
        const profile = await api.getProfile(userId);
        setCode(profile.referral_code);
        const refs = await api.getReferrals(userId);
        setList(refs as unknown as Referral[]);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
    load();
  }, [userId]);

  const referralLink = code ? `${window.location.origin}?ref=${code}` : '';

  return (
    <div>
      <h2>Your Referrals</h2>
      {code && (
        <p>
          Your referral code: <strong>{code}</strong>
          <br />
          Share this link with friends: <br />
          <a href={referralLink}>{referralLink}</a>
        </p>
      )}
      <h3>Referred Users</h3>
      {list.length === 0 && <p>No referrals yet.</p>}
      {list.length > 0 && (
        <ul>
          {list.map((r) => (
            <li key={r.childId}>
              Child ID: {r.childId} (level {r.level})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReferralsPage;
