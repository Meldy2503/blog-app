import React from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Icon,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import { RiEyeCloseLine } from "react-icons/ri";
import { passwordValidate } from "./utils/form.-validate";

const PasswordInput = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl mb="1rem">
      <FormLabel>Password</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          focusBorderColor="none"
        />
        <InputRightElement>
          <Box onClick={handleClick}>
            {show ? <Icon as={FiEye} /> : <Icon as={RiEyeCloseLine} />}
          </Box>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordInput;
