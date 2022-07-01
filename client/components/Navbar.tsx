import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { AiOutlineLogin } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { useMediaQuery } from "@chakra-ui/react";

const Navbar: React.FC = () => {
  const [isSmallerThan760] = useMediaQuery("(max-width: 760px)");

  return (
    <Flex>
      <Box>
        <Text>Blog</Text>
      </Box>
      <Spacer />
      <Box width="40%">
        {!isSmallerThan760 ? (
          <Flex justify="space-around" width="100%">
            <Text>Home</Text>
            <Text>Login</Text>
            <Text>Sign Up</Text>
            <Text>Dashboard</Text>
          </Flex>
        ) : (
          <Flex justify="end">
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FcMenu />}
                variant="outline"
                color="red.400"
              />
              <MenuList>
                <Link href="/" passHref>
                  <MenuItem icon={<FcHome />}>Home</MenuItem>
                </Link>
                <Link href="/search" passHref>
                  <MenuItem icon={<AiOutlineLogin />}>Login</MenuItem>
                </Link>
                <Link href="/search?purpose=for-sale" passHref>
                  <MenuItem icon={<FcAbout />}>Sign Up</MenuItem>
                </Link>
                <Link href="/search?purpose=for-rent" passHref>
                  <MenuItem icon={<MdDashboard />}>Dashboard</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
