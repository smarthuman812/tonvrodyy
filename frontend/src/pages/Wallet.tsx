import React from "react";
import { motion } from "framer-motion";
import { Box, VStack, Text, Button, SimpleGrid } from "@chakra-ui/react";
import "../styles/visual-layer.css";

const MotionBox = motion(Box);

const WalletPage: React.FC = () => {
  return (
    <Box minH="100vh" p={8}>
      <VStack spacing={8}>
        <MotionBox
          className="card-ton"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          p={8}
          textAlign="center"
        >
          <Text fontSize="3xl" fontWeight="bold" mb={4}>
            <img src="/icons/ton-logo.svg" className="ton-icon" />
            Wallet Balance
          </Text>
          <Text fontSize="2xl" mb={6}>
            <span style={{ color: "#00BFFF" }}>15.37 TON</span>
          </Text>
          <Button className="neon-glow" w="full" mb={3}>
            Deposit
          </Button>
          <Button variant="outline" className="neon-glow" w="full">
            Withdraw
          </Button>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
          {[
            { title: "Total Bets", value: "124 TON" },
            { title: "Total Wins", value: "190 TON" },
            { title: "Net Profit", value: "+66 TON" },
          ].map((stat) => (
            <MotionBox
              key={stat.title}
              className="card-ton"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              p={6}
              textAlign="center"
            >
              <Text fontWeight="bold" color="#00BFFF">
                {stat.title}
              </Text>
              <Text fontSize="xl" mt={2}>
                {stat.value}
              </Text>
            </MotionBox>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default WalletPage;
