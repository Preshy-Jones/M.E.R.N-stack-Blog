import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Post } from "../../types/blog";
import moment from "moment";
import { shortenText } from "../../utils/shortenText";

interface Props {
  post: Post;
}

const Blog: React.FC<Props> = ({ post }) => {
  return (
    <Box width="100%">
      <Grid width="100%">
        <Image
          src="https://res.cloudinary.com/xxolcare/image/upload/v1656769025/0R7BdnZl_gyeWOKsudAVmI7gNR673V4BIxQM6gwT-FY_it8yqe.png"
          width="100%"
          height="300px"
        />
        <Text letterSpacing={2} py={2}>
          {moment(post.createdAt).format("MMMM DD, YYYY")}
        </Text>
        <Flex justify="space-between" px={3} bg="#F2FEFF" py={2} my={3}>
          <Text fontWeight="bold">Tech</Text>
          <Text>5min read</Text>
        </Flex>
        <Text fontWeight="extrabold" fontSize="xl">
          {" "}
          {post.title}
        </Text>
        <Text fontSize="sm" color="#B9B9B9" fontWeight="bold" py={2}>
          {shortenText(post.description)}
        </Text>
      </Grid>
    </Box>
  );
};

export default Blog;
