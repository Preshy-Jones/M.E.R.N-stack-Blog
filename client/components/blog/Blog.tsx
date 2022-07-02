import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React from "react";

const Blog: React.FC = () => {
  return (
    <Box>
      <Grid>
        <Image
          src="https://res.cloudinary.com/xxolcare/image/upload/v1656769025/0R7BdnZl_gyeWOKsudAVmI7gNR673V4BIxQM6gwT-FY_it8yqe.png"
          // width="100%"
          // height="100%"
        />
        <Text letterSpacing={2} py={2}>
          FEBRUARY. 02, 2020
        </Text>
        <Flex justify="space-between" px={3} bg="#F2FEFF" py={2} my={3}>
          <Text fontWeight="bold">Tech</Text>
          <Text>5min read</Text>
        </Flex>
        <Text fontWeight="extrabold" fontSize="xl">
          {" "}
          What is a dectralized Application and why should you care?
        </Text>
        <Text fontSize="sm" color="#B9B9B9" fontWeight="bold" py={2}>
          The fastest-growing apps in 2022 If there is one thing there’s no
          shortage of, it’s apps. Apps stores are bursting at the seams, making
          it tricky to...
        </Text>
      </Grid>
    </Box>
  );
};

export default Blog;
