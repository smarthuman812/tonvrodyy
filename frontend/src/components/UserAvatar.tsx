import React from 'react';

const UserAvatar: React.FC<{
  src?: string | null;
  alt?: string;
  size?: number;
}> = ({ src, alt = 'User Avatar', size = 40 }) => {
  const fallback = 'https://placehold.co/40x40';
  return (
    <img
      src={src || fallback}
      alt={alt}
      width={size}
      height={size}
      style={{ borderRadius: '50%' }}
    />
  );
};

export default UserAvatar;
