import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import blogImage from "../public/blog.jpeg";
import Link from "next/link";
import * as Yup from "yup";
import MyTextField from "../components/ui/TextField";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { STATUS } from "../types/status";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { registerUser } from "../features/auth/authSlice";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  password2: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUp: React.FC = () => {
  interface InitialValues {
    name: string;
    email: string;
    password: string;
    password2: string;
  }

  const initialValues: InitialValues = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  const dispatch = useAppDispatch();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { status, message } = useAppSelector((store) => store.auth);
  const toast = useToast();
  const router = useRouter();

  return (
    <Box bg="#DCDFFE">
      <Center bg="#DCDFFE" width="100%" height="100vh">
        <Grid templateColumns="repeat(2, 1fr)" width="80%" height="80%">
          <GridItem height="100%" p={10} borderLeftRadius="1rem" bg="#FFF">
            <Flex direction="column" justify="center" height="100%">
              <Text fontSize="3xl" fontWeight="bold" mb="5">
                Sign Up
              </Text>
              <Text mb="5" fontWeight="semibold" color="#B9B9B9">
                Tell your story and share your knowledge with the world
              </Text>
              <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  const response = await dispatch(registerUser(values));
                  console.log(response);

                  if (response.error) {
                    toast({
                      title: "An error occured",
                      description: response.payload,
                      position: "top-right",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                    console.log(message);
                  }

                  if (
                    response.payload.status === "success" &&
                    !response.error
                  ) {
                    toast({
                      // title: "An error occured",
                      description: "RegisteredSuccessfully",
                      position: "top-right",
                      status: "success",
                      duration: 6000,
                      isClosable: true,
                    });
                    router.push("/login");
                  }
                }}
              >
                {({
                  values,
                  handleChange,
                  isSubmitting,
                  errors,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <Form>
                    {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                    <MyTextField
                      placeholder="Name"
                      label="Name"
                      name="name"
                      type="text"
                    />
                    <MyTextField
                      placeholder="Email"
                      label="Email"
                      name="email"
                      type="email"
                    />
                    <MyTextField
                      type="password"
                      name="password"
                      label="Password"
                      placeholder="Enter password"
                    />
                    <MyTextField
                      type="password"
                      name="password2"
                      label="Confirm password"
                      placeholder="Enter password again"
                    />
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
                      {isSubmitting ? <Spinner speed="0.4s" /> : "Signup"}
                    </Button>
                  </Form>
                )}
              </Formik>
              <Flex alignItems="center" mt="4">
                <Text mr="4">Do you already have an account?</Text>
                <Text color="#5138EE" fontWeight="bold">
                  <Link href="/login" passHref>
                    Login
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
                borderRightRadius="1rem"
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

export default SignUp;
