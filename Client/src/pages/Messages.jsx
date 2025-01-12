"use client";

// import Head from 'next/head'
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Flex,
} from "@chakra-ui/react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import MessageUser from "../components/MessageUser";

export default function Messages() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFriends = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/users/getfriends");
      const userIds = res.data;
      setUsers(userIds);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  },[])
  
  return (
    <>
      <Container maxW={"90vw"}>
        <Header />

        <Flex h={'80vh'} justifyContent={"space-between"} width={'85vw'}>
            <Flex>
                    <Box border={'2px'} width={'30vw'} borderColor={"white"}>
                      {
                        users.map((user, index) => <MessageUser key = {index} userId = {user}/> )
                      }
                    </Box>
            </Flex>
            <Flex>
                <Box border={'2px'} width={'60vw'} borderColor={"white"}>
                    
                </Box>
            </Flex>
        </Flex>
        
      </Container>
    </>
  );
}

