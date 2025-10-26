import { Flex, HStack, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
;

export default function Navbar({ username }: { username?: string | null }) {
  return (
    <Flex
       as="nav"
  bg="rgba(15,15,1,0.1)"
  backdropFilter="blur(3000px)"
  borderBottom="1px solid"
  borderColor="gray.700"
  px={23}
  py={1}
  align="center"
  justify="center"
  position="sticky"
  top={0.3}
  zIndex={1}
>
  <HStack spacing={9}>
    {['Home', 'Lobby', 'Wallet', 'Referrals', 'Profile'].map((label) => (
      <NavLink
        key={label}
        to={`/${label === 'Home' ? '' : label.toLowerCase()}`}
        style={({ isActive }) => ({
          color: isActive ? '#00baff' : '#aaa',
          fontWeight: 470,
        })}
      >
        {label}
      </NavLink>
    ))}
  </HStack>
</Flex>
  );
}