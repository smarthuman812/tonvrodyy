import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  VStack,
  Text,
  Button,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

const MotionBox = motion(Box);

const LobbyPage: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const cardBg = useColorModeValue("rgba(255,255,255,0.04)", "rgba(255,255,255,0.04)");
  const borderColor = useColorModeValue("rgba(255,255,255,0.08)", "rgba(255,255,255,0.08)");

  const lobbies = [
    { id: 1, title: "Round 0.5 TON", players: "10", prize: "5 TON", status: "waiting" },
    { id: 2, title: "Round 1 TON", players: "15", prize: "15 TON", status: "active" },
    { id: 3, title: "Round 2 TON", players: "30", prize: "60 TON", status: "finished" },
  ];

  return (
    <Box minH="100vh" p={6}>
      <VStack spacing={6}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Text fontSize="3xl" fontWeight="bold">
            Available Lobbies
          </Text>
        </motion.div>

        <HStack
          spacing={6}
          overflowX="auto"
          py={6}
          css={{ "&::-webkit-scrollbar": { display: "none" } }}
        >
          {lobbies.map((lobby, index) => (
            <MotionBox
              key={lobby.id}
              onClick={() => setSelected(lobby.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: selected === lobby.id ? 1.05 : 1 }}
              transition={{ delay: index * 0.2 }}
              bg={cardBg}
              border={`1px solid ${borderColor}`}
              borderRadius="16px"
              p={6}
              minW="250px"
              boxShadow={selected === lobby.id ? "0 0 20px rgba(0,191,255,0.3)" : "none"}
              cursor="pointer"
              textAlign="center"
            >
              <Text fontWeight="bold" fontSize="lg" mb={1}>
                {lobby.title}
              </Text>
              <Text fontSize="sm" color="gray.400">
                Players: {lobby.players}
              </Text>
              <Text fontSize="sm" color="gray.400">
                Prize: {lobby.prize}
              </Text>
              <Text
                mt={2}
                fontWeight="semibold"
                color={
                  lobby.status === "active"
                    ? "green.400"
                    : lobby.status === "waiting"
                    ? "ton.400"
                    : "red.400"
                }
              >
                {lobby.status.toUpperCase()}
              </Text>
              <Button
                mt={3}
                colorScheme="ton"
                size="sm"
                onClick={() => console.log(`Join ${lobby.title}`)}
              >
                Join
              </Button>
            </MotionBox>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

export default LobbyPage;
