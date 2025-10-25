import { Flex, HStack, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { TonConnectButton } from '@tonconnect/ui-react';

export default function Navbar({ username }: { username?: string | null }) {
  return (
    <Flex
      as="nav"
      bg="rgba(15,15,15,0.8)"
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor="gray.700"
      px={6}
      py={3}
      align="center"
      justify="space-between"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <HStack spacing={6}>
        {['Home', 'Lobby', 'Wallet', 'Referrals', 'Profile'].map((label) => (
          <NavLink
            key={label}
            to={`/${label === 'Home' ? '' : label.toLowerCase()}`}
            style={({ isActive }) => ({
              color: isActive ? '#00baff' : '#aaa',
              fontWeight: 500,
            })}
          >
            {label}
          </NavLink>
        ))}
      </HStack>
      <HStack spacing={4}>
        {username && <Text fontSize="sm">1337, {username}</Text>}
        <TonConnectButton />
      </HStack>
    </Flex>
  );
}