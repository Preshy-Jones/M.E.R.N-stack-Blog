import { Box, Center, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";

const Hero: React.FC = () => {
  return (
    <Box bg="#F2FEFF">
      <Center height={350}>
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Text fontSize="5xl" fontWeight="bold">
            Dev Blogiverse
          </Text>
          <Text fontSize="xl" color="gray.500" fontWeight="bold">
            The only Dev Blog you&apos;ll  need in the universe
          </Text>
        </Flex>
      </Center>
    </Box>
  );
};

export default Hero;
