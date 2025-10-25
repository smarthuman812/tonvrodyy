import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Select,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface Lobby {
  id: string;
  type: string;
  max_players: number;
  bet: number;
  prize: number;
  status: string;
}

const lobbyTypes = [
  { label: "10 участников — 0.5 TON", max_players: 10, bet: 0.5, prize: 5 },
  { label: "15 участников — 1 TON", max_players: 15, bet: 1, prize: 15 },
  { label: "30 участников — 2 TON", max_players: 30, bet: 2, prize: 60 },
];

const LobbyPage: React.FC = () => {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [selectedType, setSelectedType] = useState(lobbyTypes[0]);
  const toast = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const demo = [
      { id: "1", type: "10 участников — 0.5 TON", max_players: 10, bet: 0.5, prize: 5, status: "waiting" },
      { id: "2", type: "15 участников — 1 TON", max_players: 15, bet: 1, prize: 15, status: "active" },
      { id: "3", type: "30 участников — 2 TON", max_players: 30, bet: 2, prize: 60, status: "finished" },
    ];
    setLobbies(demo);
  }, []);

  const handleCreateLobby = () => {
    const newLobby: Lobby = {
      id: String(Date.now()),
      ...selectedType,
      status: "waiting",
      type: ""
    };
    setLobbies((prev) => [newLobby, ...prev]);
    toast({ title: "Лобби создано", status: "success", duration: 2000 });
  };

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, blackAlpha.900, gray.900)"
      color="whiteAlpha.900"
      p={6}
    >
      <VStack spacing={6} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Available Lobbies
        </Text>

        {/* Создание лобби */}
        <HStack spacing={3}>
          <Select
            value={selectedType.label}
            onChange={(e) => {
              const type = lobbyTypes.find((t) => t.label === e.target.value);
              if (type) setSelectedType(type);
            }}
            bg="gray.800"
            border="none"
            w="260px"
          >
            {lobbyTypes.map((type) => (
              <option key={type.label} value={type.label}>
                {type.label}
              </option>
            ))}
          </Select>
          <Button colorScheme="teal" onClick={handleCreateLobby}>
            Create Lobby
          </Button>
        </HStack>

        {/* Карусель лобби */}
        <HStack w="100%" justify="center" position="relative">
          <IconButton
            aria-label="scroll left"
            icon={<ChevronLeftIcon />}
            onClick={scrollLeft}
            variant="ghost"
            colorScheme="teal"
            position="absolute"
            left={0}
            top="50%"
            transform="translateY(-50%)"
            zIndex={1}
          />
          <HStack
            ref={scrollRef}
            spacing={6}
            overflowX="auto"
            py={6}
            px={10}
            scrollSnapType="x mandatory"
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {lobbies.map((lobby) => (
              <Box
                key={lobby.id}
                flex="0 0 auto"
                scrollSnapAlign="center"
                w="280px"
                h="240px"
                p={5}
                bg="gray.800"
                borderRadius="md"
                boxShadow="xl"
                textAlign="center"
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.07)", bg: "gray.700" }}
              >
                <VStack spacing={3}>
                  <Text fontWeight="bold" fontSize="lg">
                    {lobby.type}
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    Players: {lobby.max_players}
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    Bet: {lobby.bet} TON
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    Prize: {lobby.prize} TON
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    Status: {lobby.status}
                  </Text>
                  <Button colorScheme="teal" size="sm">
                    Play
                  </Button>
                </VStack>
              </Box>
            ))}
          </HStack>
          <IconButton
            aria-label="scroll right"
            icon={<ChevronRightIcon />}
            onClick={scrollRight}
            variant="ghost"
            colorScheme="teal"
            position="absolute"
            right={0}
            top="50%"
            transform="translateY(-50%)"
            zIndex={1}
          />
        </HStack>

        {lobbies.length === 0 && (
          <Text color="gray.500" mt={10}>
            No lobbies found.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default LobbyPage;
