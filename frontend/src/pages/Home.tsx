import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  VStack,
  Text,
  Button,
  HStack,
  Table,
  Tbody,
  Tr,
  Td,
  SimpleGrid,
} from "@chakra-ui/react";
import "../styles/visual-layer.css";

// Import the TON Connect UI hook and Telegram helper. These provide access
// to the TON Connect UI instance for programmatically opening the wallet
// connect modal and to the Telegram user data when the app runs inside
// a Telegram WebApp.
import { useTonConnectUI } from "@tonconnect/ui-react";
import { getTelegramUser } from "../telegram";

const MotionBox = motion(Box);

const HomePage: React.FC = () => {
  // Retrieve the Telegram user from the injected API. This will be null
  // when running outside of the Telegram mini app context. Log the user
  // information for debugging purposes.
  const user = getTelegramUser();
  if (user) {
    console.log("Telegram user:", user);
  }

  // Acquire the TonConnectUI instance from the context provided by
  // TonConnectUIProvider. This hook returns a tuple; the first element
  // is the UI controller used to open the wallet connection modal and
  // subscribe to wallet status changes.
  const [tonConnectUI] = useTonConnectUI();

  /**
   * Open the TON Connect modal when a user wants to connect their wallet.
   */
  const handleConnect = () => {
    tonConnectUI.openModal();
  };

  /**
   * Generate a deterministic user_id based on the Telegram user ID and
   * the current date. This combines selected digits of the Telegram ID,
   * multiplies by 7, and appends the YYYYMMDD date string.
   */
  const genUserId = () => {
    if (!user?.id) return null;
    const idString = String(user.id);
    // Ensure there are at least four digits. Telegram IDs are typically longer.
    if (idString.length < 4) return null;
    const code = parseInt(idString[0] + idString[2] + idString[3] + idString[0]) * 7;
    const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
    return `${code}${date}`;
  };

  // Persist the generated user ID to localStorage. If genUserId returns
  // null (e.g. outside of Telegram), nothing is stored. We do this
  // eagerly so that it is available before a wallet connection occurs.
  const uid = genUserId();
  if (uid) {
    localStorage.setItem("user_id", uid);
  }

  // Subscribe to wallet status changes. When the user connects a wallet,
  // this callback persists the wallet address in localStorage. The
  // subscription returns an unsubscribe function which we call on
  // component unmount to avoid memory leaks.
  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet?.account) {
        localStorage.setItem("wallet", wallet.account.address);
        console.log("Wallet connected:", wallet.account.address);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [tonConnectUI]);
  return (
    <Box minH="100vh" p={8} position="relative">
      <VStack spacing={14} align="center" zIndex={1}>
        <MotionBox
          className="card-ton"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          p={8}
          w="100%"
          maxW="900px"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            <img src="/icons/ton-logo.svg" className="ton-icon" />
            Smart Contract Overview
          </Text>
          <Table variant="simple" colorScheme="ton" size="sm" className="table-wrapper">
            <Tbody>
              <Tr><Td>Contract Address</Td><Td color="#00BFFF">EQB3X4d2GqLz...Fa4</Td></Tr>
              <Tr><Td>Network</Td><Td>testnet</Td></Tr>
              <Tr><Td>Total Rounds</Td><Td>183</Td></Tr>
              <Tr><Td>Total Volume</Td><Td>≈ 9 400 TON</Td></Tr>
            </Tbody>
          </Table>

          <HStack justify="center" mt={6}>
            <Button className="neon-glow">View in Explorer</Button>
            <Button variant="outline" className="neon-glow">
              Open Source Code
            </Button>
            {/* Button to trigger wallet connection. When clicked it
                opens the TON Connect modal via handleConnect. */}
            </HStack>
        </MotionBox>

        <MotionBox
          className="card-ton"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          p={8}
          w="100%"
          maxW="900px"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Community
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {[
              { title: "Telegram Community", link: "https://t.me/tonrody" },
              { title: "BIG NACHO", link: "https://t.me/durov" },
              { title: "Docs & Roadmap", link: "#" },
            ].map((item) => (
              <MotionBox
                key={item.title}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="card-ton neon-glow"
                p={6}
                textAlign="center"
                onClick={() => window.open(item.link, "_blank")}
              >
                <Text fontWeight="bold" fontSize="lg" color="#00BFFF">
                  {item.title}
                </Text>
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionBox>
      </VStack>
    </Box>
  );
};

export default HomePage;