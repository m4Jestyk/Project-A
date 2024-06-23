import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Container,
  Stack,
  Text,
  VStack,
  HStack,
  Box,
  Heading,
  Button,
  Flex,
} from "@chakra-ui/react";
import PacmanLoader from "react-spinners/PacmanLoader";

const Finder = () => {
  const [loading, setLoading] = useState(false);
  const [finding, setFinding] = useState(false);
  const [foundUser, setFoundUser] = useState(null); // Store the found user in state

  const getRandomUser = async () => {
    const res = await fetch("/api/v1/users/random", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userData = await res.json();
    setFoundUser(userData); // Store the found user in state
    console.log(foundUser);
  };

  const handleStartBtn = async () => {
    setFinding(true);
  }

  useEffect(() => {
    
      getRandomUser();
    
  }, [finding]);

  useEffect(() => {
    if (foundUser) {
      console.log(foundUser);
    }
  }, [foundUser]);

  return (
    <div>
      <Container maxW={"90vw"}>
        <Header />
        <HStack
          as={Box}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 24 }}
        >
          {!finding ? (
            <Flex width={"50vw"} justifyContent={"space-around"}>
              <Button
                borderRadius={400}
                fontSize={"2xl"}
                width={40}
                height={40}
                onClick={handleStartBtn}
              >
                Lesgoo?
              </Button>
            </Flex>
          ) : (
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
            >
              <Text>{foundUser ? foundUser.name :  <PacmanLoader color="#ffffff" size={75} />
            }</Text>
            </Heading>
          )}

          <Heading
            m={10}
            width={"50vw"}
            fontWeight={600}
            fontSize={{ base: "s", sm: "s", md: "5xl" }}
            lineHeight={"110%"}
          >
            connect with new people through short and anonymous profile bio
            {"(s)"}
            <br />
            <Text as={"span"} color={"green.400"}>
              before the timer runs out
            </Text>
          </Heading>
        </HStack>
      </Container>
    </div>
  );
};

export default Finder;
