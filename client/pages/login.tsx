import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, useField, FieldProps } from "formik";
import blogImage from "../public/blog.jpeg";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser } from "../features/auth/authSlice";
import * as Yup from "yup";
import { store } from "../store/store";
import { STATUS } from "../types/status";
import { useRouter } from "next/router";
import MyTextField from "../components/ui/TextField";
import { useToast } from "@chakra-ui/react";
import { signIn } from 'next-auth/react'

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  interface InitialValues {
    email: string;
    password: string;
  }

  const initialValues: InitialValues = {
    email: "",
    password: "",
  };

  const [input, setInput] = useState("");

  const isError = input === "";
  const router = useRouter();
  const toast = useToast();
  //LOGIN
  const dispatch = useAppDispatch();

  const { status, message } = useAppSelector((store) => store.auth);
  

  return (
    <Box bg="#DCDFFE">
      <Center bg="#DCDFFE" width="100%" height="100vh">
        <Grid
          templateColumns="repeat(2, 1fr)"
          width="80%"
          height="80%"
          bg="#FFF"
        >
          <GridItem height="100%" p={10}>
            <Flex direction="column" justify="center" height="100%">
              <Text fontSize="3xl" fontWeight="bold" mb="5">
                Login
              </Text>
              <Text mb="5" fontWeight="semibold" color="#B9B9B9">
                Tell your story and share your knowledge with the world
              </Text>
              <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting }) => {
                  const response = await dispatch(loginUser(values));
                  console.log(response);

                  if (response.error) {
                    toast({
                      title: "An error occured",
                      description: response.payload,
                      position: "top-right",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                    console.log(message);
                  }

                  if (response.payload.success && !response.error) {
                    toast({
                      // title: "An error occured",
                      description: "Logged in Successfully",
                      position: "top-right",
                      status: "success",
                      duration: 6000,
                      isClosable: true,
                    });
                    router.push("/dashboard");
                  }
                }}
                validationSchema={loginSchema}
              >
                {({
                  values,
                  handleChange,
                  isSubmitting,
                  setFieldValue,
                  errors,
                }) => (
                  <Form>
                    <pre>{JSON.stringify(errors, null, 2)}</pre>
                    <MyTextField
                      placeholder="Email"
                      label="Email"
                      name="email"
                      type="email"
                    />

                    <FormControl my={6}>
                      <MyTextField
                        type="password"
                        name="password"
                        label="password"
                        placeholder="Enter password"
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      mt={2}
                      width="100%"
                      bg="#5138EE"
                      color="#FFFF"
                      _hover={{
                        opacity: 0.9,
                      }}
                    >
                      {isSubmitting ? <Spinner speed="0.4s" /> : "Login"}
                    </Button>
                  </Form>
                )}
              </Formik>
              <Flex alignItems="center" mt="4">
                <Text mr="4">Not registered yet?</Text>
                <Text color="#5138EE" fontWeight="bold">
                  <Link href="/signup" passHref>
                    Create an Account
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem height="100%" position="relative">
            <Box>
              <Image
                src="https://res.cloudinary.com/xxolcare/image/upload/v1656785612/squidgame_bsot2b.jpg"
                height="80vh"
                width="40vw"
              />
            </Box>
            {/* <Box
              bg="black"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              opacity={0.4}
            ></Box> */}
          </GridItem>
        </Grid>
      </Center>
    </Box>
  );
};

export default Login;
