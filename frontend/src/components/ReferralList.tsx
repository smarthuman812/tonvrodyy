import React from 'react';

interface Referral {
  childId: string;
  level: number;
}

interface Props {
  referrals: Referral[];
}

/**
 * Component to display a list of referral entries. Each entry shows the child user id and level.
 */
const ReferralList: React.FC<Props> = ({ referrals }) => {
  if (referrals.length === 0) {
    return <p>No referrals yet.</p>;
  }
  return (
    <ul>
      {referrals.map((ref) => (
        <li key={ref.childId}>
          Child ID: {ref.childId} (level {ref.level})
        </li>
      ))}
    </ul>
  );
};

export default ReferralList;
