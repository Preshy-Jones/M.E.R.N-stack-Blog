import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import { useEffect, useState } from "react";
import {
  selectAuthMessage,
  selectAuthStatus,
} from "../../features/auth/authSlice";
import { useAppSelector } from "../../store/hooks";
import { STATUS } from "../../types/status";

const MyTextField = ({ label, type, placeholder, ...props }: any) => {
  const [field, meta] = useField(props);
  let errorText = meta.error && meta.touched ? meta.error : "";
  const isError = errorText ? true : false;
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const status = useAppSelector(selectAuthStatus);
  const message = useAppSelector(selectAuthMessage);

  // useEffect(() => {
  //   console.log("hello");

  //   if (status === STATUS.ERROR) {
  //     errorText = message;
  //   }
  // }, [status]);

  return (
    <FormControl isInvalid={isError}>
      <FormLabel htmlFor="email" fontWeight="normal">
        {label}
      </FormLabel>
      {type === "password" ? (
        <InputGroup size="md">
          <Field
            as={Input}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder={placeholder}
            {...field}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        <Field as={Input} placeholder={placeholder} type={type} {...field} />
      )}
      {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
    </FormControl>
  );
};

export default MyTextField;
