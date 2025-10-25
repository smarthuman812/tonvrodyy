import React from "react";
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

const MotionBox = motion(Box);

const HomePage: React.FC = () => {
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
              <Tr><Td>Network</Td><Td>Mainnet</Td></Tr>
              <Tr><Td>Total Rounds</Td><Td>183</Td></Tr>
              <Tr><Td>Total Volume</Td><Td>≈ 9 400 TON</Td></Tr>
            </Tbody>
          </Table>

          <HStack justify="center" mt={6}>
            <Button className="neon-glow">View in Explorer</Button>
            <Button variant="outline" className="neon-glow">
              Open Source Code
            </Button>
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
              { title: "X / Twitter Updates", link: "https://x.com" },
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
