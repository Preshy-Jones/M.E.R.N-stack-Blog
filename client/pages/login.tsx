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
import React from "react";
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

const Login: React.FC = () => {
  interface InitialValues {
    email: string;
    password: string;
  }

  const initialValues: InitialValues = {
    email: "",
    password: "",
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
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
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({ values, handleChange, isSubmitting, setFieldValue }) => (
                  <Form>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                    <Box>
                      <Text>Email</Text>
                      <Field
                        as={Input}
                        placeholder="Email"
                        name="email"
                        type="email"
                      />
                    </Box>
                    <Box my={6}>
                      <Text>Password</Text>
                      <InputGroup size="md">
                        <Field
                          as={Input}
                          pr="4.5rem"
                          type={show ? "text" : "password"}
                          placeholder="Enter password"
                          name="password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </Box>
                    <Button mt={2} width="100%" bg="#5138EE" color="#FFFF">
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
