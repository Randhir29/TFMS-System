// src/pages/DashBoard.jsx (or wherever you keep it)

import { Box, Flex, Text } from "../components/ui/primitives/Primitives.jsx";

function DashBoard() {
  return (
    <Flex
      direction="column"
      gap="6"
      p="6"
      bg="brand.50"       // semantic token from your theme.semanticTokens.colors.bg
      color="gray.800"  // semantic token from your theme.semanticTokens.colors.text
      minH="100vh"
    >
      <Text textStyle="headline" color="gray.600">Dashboard</Text>

      <Box
        p="4"
        borderWidth="1px"
        borderColor="border"   // semantic token
        borderRadius="lg"
      >
        <Text textStyle="bodyText" color="gray.700" >
          This is the Dashboard page using TFMS Chakra v3 primitives.
        </Text>
      </Box>
    </Flex>
  );
}

export default DashBoard;
