import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Blog from "./Blog";

const BlogsSection: React.FC = () => {
  const bush = [3, 3, 3, 3, 3, , 3, 3, 3, 3, 3, 3, 3, 3];
  return (
    <Box>
      <Flex justify="center">
        <Grid
          pt={12}
          templateColumns="repeat(3, 1fr)"
          columnGap={9}
          rowGap={5}
          width="75%"
        >
          {bush.map((bus, index) => (
            <GridItem key={index}>
              <Blog />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
};

export default BlogsSection;
