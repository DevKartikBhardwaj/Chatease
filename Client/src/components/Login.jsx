import {
  FormControl,
  VStack,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false);
  const [type, setType] = useState("password");

  const history=useNavigate();
  const toast=useToast();
  const handleClick = () => {
    setType(type == "text" ? "password" : "text");
  };
 
  const handleSubmit=async()=>{
    setLoading(true);
    if(!email||!password){
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config={
        headers:{
          'content-type':'application/json'
        }
      }
      const {data}=await axios.post("http://localhost/api/user/login",{email,password},config);
      console.log(data)
      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false);
      toast({
        title: "Login Successful",
        description: "successfully logged in",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      history("/chats");
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

    const setGuestCredentials = () => {
      setEmail("guest@example.com");
      setPassword("guest1234");
    }
  return (
    <VStack spacing={"5px"}>
        <FormControl id="email" isRequired>
        <FormLabel p={1}>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      
      <FormControl id="password" isRequired>
        <FormLabel p={1}>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter Your Password"
            type={type}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {type == "text" ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>


      <Button
        size="md"
        height="48px"
        width="100%"
        border="2px"
        borderColor="blue.500"
        marginTop={15}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        size="md"
        height="48px"
        width="100%"
        border="2px"
        borderColor="blue.500"
        marginTop={15}
        onClick={setGuestCredentials}
      >
        Login as guest
      </Button>
    </VStack>
  );
};

export default Login;
