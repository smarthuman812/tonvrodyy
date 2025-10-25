import React from 'react';

interface Referral {
  childId: string;
  level: number;
}

const ReferralList: React.FC<{ referrals: Referral[] }> = ({ referrals }) =>
  referrals.length === 0 ? (
    <p>No referrals yet.</p>
  ) : (
    <ul>
      {referrals.map((ref) => (
        <li key={ref.childId}>
          Child ID: {ref.childId} (level {ref.level})
        </li>
      ))}
    </ul>
  );

export default ReferralList;
