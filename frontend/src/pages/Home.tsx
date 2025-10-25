import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Text, VStack, Heading } from "@chakra-ui/react";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, blackAlpha.900, gray.900)"
      color="whiteAlpha.900"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={6} textAlign="center" maxW="600px" px={6}>
        <Text
          fontSize="xs"
          letterSpacing="widest"
          textTransform="uppercase"
          color="gray.400"
        >
          Welcome to Reality
        </Text>

        <Heading size="lg" fontWeight="bold">
          TONRODY
        </Heading>

        <Text fontSize="md" color="gray.300">
          10 участников. 10 ставок. 1 победитель.  
          Каждый раунд проверяется смарт-контрактом TON,  
          подтверждая честность и прозрачность боёв.
        </Text>

        <Button
          onClick={() => navigate("/lobby")}
          colorScheme="teal"
          size="lg"
          px={10}
          _hover={{ bg: "teal.400" }}
        >
          Enter Lobby
        </Button>
      </VStack>
    </Box>
  );
};

export default Home;
