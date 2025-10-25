import React from "react";
import { motion } from "framer-motion";
import { Box, VStack, Text, HStack, Button, Progress } from "@chakra-ui/react";

const MotionBox = motion(Box);

const Wallet: React.FC = () => {
  const balance = 15.37;

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="radial-gradient(circle at 50% 20%, rgba(0,191,255,0.1), rgba(0,0,0,0.95))"
      position="relative"
      overflow="hidden"
    >
      {/* Звёзды */}
      {[...Array(40)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          w="2px"
          h="2px"
          bg={i % 2 === 0 ? "cyan.400" : "whiteAlpha.700"}
          borderRadius="full"
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          opacity={Math.random()}
          animation={`blink ${2 + Math.random() * 3}s infinite ease-in-out alternate`}
          css={{
            "@keyframes blink": {
              "0%": { opacity: 0.1 },
              "100%": { opacity: 1 },
            },
          }}
        />
      ))}

      <MotionBox
        bg="rgba(255,255,255,0.04)"
        border="1px solid rgba(0,191,255,0.25)"
        borderRadius="20px"
        backdropFilter="blur(16px)"
        boxShadow="0 0 40px rgba(0,191,255,0.15), inset 0 0 20px rgba(255,255,255,0.05)"
        p={10}
        textAlign="center"
        maxW="650px"
        mx={4}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <VStack spacing={8}>
          <Text
            fontFamily="Orbitron, sans-serif"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            color="cyan.300"
            textShadow="0 0 12px rgba(0,255,255,0.6)"
          >
            TON ENERGY CORE
          </Text>

          <Box>
            <Text
              fontSize={{ base: "4xl", md: "5xl" }}
              color="cyan.200"
              textShadow="0 0 20px rgba(0,255,255,0.7)"
              fontWeight="bold"
            >
              {balance.toFixed(2)} TON
            </Text>
            <Text color="whiteAlpha.700" fontSize="sm" mt={1}>
              Current Reactor Charge
            </Text>
          </Box>

          <Progress
            value={(balance / 30) * 100}
            size="lg"
            colorScheme="cyan"
            borderRadius="10px"
            bg="rgba(255,255,255,0.05)"
            w="80%"
            sx={{
              "& > div": {
                background:
                  "linear-gradient(90deg, rgba(0,191,255,0.8), rgba(0,255,255,0.6))",
                boxShadow: "0 0 20px rgba(0,255,255,0.3)",
              },
            }}
          />

          <HStack spacing={6} pt={4}>
            <Button
              size="lg"
              bg="rgba(0,191,255,0.2)"
              border="1px solid rgba(0,191,255,0.4)"
              borderRadius="14px"
              color="cyan.100"
              fontWeight="semibold"
              px={8}
              py={6}
              boxShadow="0 0 20px rgba(0,191,255,0.25)"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "0 0 35px rgba(0,191,255,0.4)",
                transition: "0.3s",
              }}
            >
              Deposit Fuel
            </Button>
            <Button
              size="lg"
              bg="rgba(255,255,255,0.05)"
              border="1px solid rgba(255,255,255,0.2)"
              borderRadius="14px"
              color="whiteAlpha.900"
              fontWeight="semibold"
              px={8}
              py={6}
              _hover={{
                transform: "scale(1.05)",
                borderColor: "rgba(0,191,255,0.6)",
                color: "cyan.200",
                transition: "0.3s",
              }}
            >
              Withdraw Energy
            </Button>
          </HStack>

          <Box pt={6} borderTop="1px dashed rgba(0,191,255,0.2)" w="full">
            <Text color="whiteAlpha.700" fontSize="sm">
              Reactor Coordinates: <Text as="span" color="cyan.300">EQa7tZ5...K9b1</Text>
            </Text>
            <Text color="whiteAlpha.700" fontSize="sm">
              Status: <Text as="span" color="green.400">Operational</Text>
            </Text>
          </Box>
        </VStack>
      </MotionBox>
    </Box>
  );
};

export default Wallet;
