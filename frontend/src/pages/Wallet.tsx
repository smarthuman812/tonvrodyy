import React from "react";
import { Box, VStack, Text, Button, Divider } from "@chakra-ui/react";
import { useTonWallet } from "@tonconnect/ui-react";

const WalletPage: React.FC = () => {
  const wallet = useTonWallet();

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, blackAlpha.900, gray.900)"
      color="whiteAlpha.900"
      p={6}
    >
      <VStack spacing={6} align="start" maxW="600px" mx="auto">
        <Text fontSize="xl" fontWeight="bold">
          Your Wallet
        </Text>
        {!wallet ? (
          <Text color="gray.400">
            Подключите TON-кошелёк с помощью кнопки в шапке.
          </Text>
        ) : (
          <>
            <Text fontSize="sm" color="gray.400">
              Connected wallet:
            </Text>
            <Text fontSize="md" fontWeight="semibold">
              {wallet.account.address}
            </Text>
            <Divider borderColor="gray.700" />

            <Text fontSize="sm" color="gray.400">
              Баланс:
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              0.00 TON
            </Text>

            <Divider borderColor="gray.700" />
            <Text fontSize="sm" color="gray.400">
              История операций
            </Text>
            <VStack align="start" spacing={2} fontSize="sm" color="gray.500">
              <Text>• Ставка: 1 TON</Text>
              <Text>• Пополнение: 5 TON</Text>
              <Text>• Вывод: 2 TON</Text>
            </VStack>

            <Divider borderColor="gray.700" />
            <Text fontSize="sm" color="gray.400">
              Рефералы: 0 | TNRD ID: #0001
            </Text>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default WalletPage;
