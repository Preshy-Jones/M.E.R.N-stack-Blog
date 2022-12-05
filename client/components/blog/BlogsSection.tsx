import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import { useAppSelector } from '../../store/hooks'
import Blog from './Blog'

const BlogsSection: React.FC = () => {
  const { posts } = useAppSelector((state) => state.blog)

  const bush = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
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
          {!!posts.length &&
            posts.map((post, index) => (
              <GridItem key={index}>
                <Blog post={post} />
              </GridItem>
            ))}
        </Grid>
      </Flex>
    </Box>
  )
}

export default BlogsSection
