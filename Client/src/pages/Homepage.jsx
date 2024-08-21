import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) navigate("/");
  }, [navigate]);

  return (
    <Container maxW={"xl"} centerContent>
      <Box
        display="flex"
        justifyContent={"center"}
        p={3}
        bg={"black"}
        w={"100%"}
        m="15px 0 15px 0"
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text fontSize={"4xl"} fontFamily={"Work Sans"} color={"white"}>
          ChatEase
        </Text>
      </Box>
      <Box
        display="flex"
        p={3}
        bg={"black"}
        w={"100%"}
        borderRadius={"lg"}
        borderWidth={"1px"}
        color={"white"}
      >
        <Tabs isFitted variant="soft-rounded" w={"100%"}>
          <TabList mb="1em">
            <Tab color={"white"}>Login</Tab>
            <Tab color={"white"}>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
