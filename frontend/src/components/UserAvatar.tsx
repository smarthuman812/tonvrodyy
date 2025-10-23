import React from 'react';

interface Props {
  src?: string | null;
  alt?: string;
  size?: number;
}

/**
 * Displays a user avatar with fallback placeholder if no image is provided.
 */
const UserAvatar: React.FC<Props> = ({ src, alt = 'User Avatar', size = 40 }) => {
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
