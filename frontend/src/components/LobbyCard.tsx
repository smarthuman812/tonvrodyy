import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";

/**
 * Layout component providing a consistent background and navigation bar.
 *
 * Wraps application pages in a gradient background and places the Navbar at
 * the top. The children are rendered below the navbar with padding.
 */
export default function Layout({
  children,
  username,
}: {
  children: React.ReactNode;
  username?: string | null;
}) {
  return (
    <Box minH="100vh" bgGradient="linear(to-br, #0b0b0b, #111827)">
      <Navbar username={username} />
      <Box p={6}>{children}</Box>
    </Box>
  );
}