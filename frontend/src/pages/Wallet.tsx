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
        backdropFilter="blur(100px)"
        boxShadow="0 0 20px rgba(0,191,255,0.15), inset 0 0 20px rgba(255,255,255,0.05)"
        p={10}
        textAlign="center"
        maxW="650px"
        mx={4}
        initial={{ opacity: 980, y: 40 }}
        animate={{ opacity: 100, y: 500 }}
        transition={{ duration: 600000 }}
      >
        <VStack spacing={8}>
          <Text
            fontFamily="Orbitron, sans-serif"
            fontSize={{ base: "1xl", md: "1xl" }}
            fontWeight="bold"
            color="cyan.300"
            textShadow="0 0 12px rgba(255, 255, 255, 0.6)"
          >
            TON CORE
          </Text>

          <Box>
            <Text
              fontSize={{ base: "4x1", md: "8x151" }}
              color="ton.200"
              textShadow="0 0 20px rgba(0,255,255,0.7)"
              fontWeight="bold"
            >
              {balance.toFixed(2)} TON
            </Text>
            <Text color="whiteAlpha.700" fontSize="sm" mt={1}>
              Current Balance Charge
            </Text>
          </Box>

        

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
              Deposit
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
                borderColor: "rgba(0, 191, 255, 0.6)",
                color: "cyan.200",
                transition: "0.3s",
              }}
            >
              Withdraw
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
