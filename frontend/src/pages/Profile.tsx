import React from "react";
import { Box, VStack, Text, Image, Button, Divider } from "@chakra-ui/react";
import { useTonConnectUI } from "@tonconnect/ui-react";

const ProfilePage: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();

  // Имитация телеграм-данных
  const tg = (window as any).Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user || {
    id: "000000",
    username: "guest",
    photo_url: "https://placehold.co/128x128",
  };

  const handleDeposit = () => {
    console.log("Deposit clicked");
  };

  const handleWithdraw = () => {
    console.log("Withdraw clicked");
  };

  const handleDonate = () => {
    tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address: "EQC-your-donation-wallet-address",
          amount: "100000000", // 0.1 TON
        },
      ],
    });
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, blackAlpha.900, gray.900)"
      color="whiteAlpha.900"
      p={6}
    >
      <VStack spacing={6} align="center">
        <Text fontSize="xl" fontWeight="bold">
          Profile
        </Text>

        <Image
          borderRadius="full"
          boxSize="96px"
          src={user.photo_url}
          alt={user.username}
        />

        <Text fontWeight="semibold">@{user.username}</Text>
        <Text fontSize="sm" color="gray.400">
          Telegram ID: {user.id}
        </Text>
        <Text fontSize="sm" color="gray.400">
          Profile ID: #{user.id}
        </Text>

        <Divider borderColor="gray.700" />

        <VStack spacing={3}>
          <Button colorScheme="teal" w="200px" onClick={handleDeposit}>
            Пополнить
          </Button>
          <Button colorScheme="purple" w="200px" onClick={handleWithdraw}>
            Вывести
          </Button>
        </VStack>

        <Divider borderColor="gray.700" />

        <Button
          variant="outline"
          colorScheme="yellow"
          w="200px"
          onClick={handleDonate}
        >
          DONATE TO DEV
        </Button>
      </VStack>
    </Box>
  );
};

export default ProfilePage;