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
import { useSession, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const [isSmallerThan760] = useMediaQuery("(max-width: 760px)");
  // const { data: session, status } = useSession();
  const status = "unauthenticated";

  return (
    <Box py="4">
      <Flex>
        <Box>
          <Text>Blog</Text>
        </Box>
        <Spacer />
        <Box width="40%" cursor="pointer">
          {!isSmallerThan760 ? (
            <Flex justify="space-around" width="100%" fontWeight="semibold">
              <Link href="/" passHref>
                <Text cursor="pointer">Home</Text>
              </Link>
              {status === "unauthenticated" && (
                <Link href="/login" passHref>
                  <Text cursor="pointer">Login</Text>
                </Link>
              )}
              {status === "unauthenticated" && (
                <Link href="/signup" passHref>
                  <Text>Sign Up</Text>
                </Link>
              )}

              <Link href="/dashboard" passHref>
                <Text>Dashboard</Text>
              </Link>

              <Link href="/new-story" passHref>
                <Text>New Story</Text>
              </Link>

              <Text cursor="pointer" onClick={() => signOut()}>
                SignOut
              </Text>
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
                  <Link href="/login" passHref>
                    <MenuItem icon={<AiOutlineLogin />}>Login</MenuItem>
                  </Link>
                  <Link href="/signup" passHref>
                    <MenuItem icon={<FcAbout />}>Sign Up</MenuItem>
                  </Link>

                  <Link href="/dashboard" passHref>
                    <MenuItem icon={<MdDashboard />}>Dashboard</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
