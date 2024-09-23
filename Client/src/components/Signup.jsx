import {
  FormControl,
  VStack,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false);
  const toast=useToast()
  const history=useNavigate();
  const handleClick = () => {
    setType(type == "text" ? "password" : "text");
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
//dwhf5f08p
    if (pics.type == "image/jpeg" || pics.type == "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatEase");
      data.append("cloud_name", "dwhf5f08p");
      fetch(
        "https:/https://chatease-backend-t06s.onrender.com/api.cloudinary.com/v1_1/dwhf5f08p/image/upload",
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
         
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }else{
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const handleSubmit = async() => {
    setLoading(true)
    if(!name||!email||!password||!confirmPassword){
      
      toast({
        title:"Please Fill all the fields",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom"
      })
      setLoading(false);
      return;
    }
    if(password!==confirmPassword){
      toast({
        title:"Password Do not match",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom"
      })
      setLoading(false);
      return;
    }
    try {
      const config={
        headers:{
          "Content-type":"application/json"
        }
      }
      const {data}=await axios.post("https://chatease-backend-t06s.onrender.com/api/user",{name,email,password,pic},config);
      localStorage.setItem("userInfo",JSON.stringify(data));
      history("/chats");
      setLoading(false);
    } catch (error) {
      toast({
        title:error.message,
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom"
      })
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="first-name" isRequired>
        <FormLabel p={1}>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
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

      <FormControl id="confirm-password" isRequired>
        <FormLabel p={1}>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Confirm Your Password"
            type={type}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {type == "text" ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="Avatar">
        <FormLabel p={1}>Avatar</FormLabel>
        <Input
          type="file"
          accept="image/*"
          p={1}
          onChange={(e) => postDetails(e.target.files[0])}
        />
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
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
