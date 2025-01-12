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
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Finder = () => {
  const [loading, setLoading] = useState(false);
  const [finding, setFinding] = useState(false);
  const [foundUser, setFoundUser] = useState(null); // Store the found user in state
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0); // Add key state to force timer reset
  const [cookies, removeCookie] = useCookies([]);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.cookiemonster) {
        navigate("/login");
      } else {
        navigate("/finder");
      }
    };
    verifyCookie();
  }, [cookies, navigate]);

  const getRandomUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/users/random", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const userData = await res.json();
      setFoundUser(userData); // Store the found user in state
      console.log(foundUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartBtn = async () => {
    setFinding(true);
    await getRandomUser();
    setIsPlaying(true);
  };

  const timerComplete = async () => {
    setIsPlaying(false);
    await getRandomUser();
    setKey((prevKey) => prevKey + 1); // Update key to restart timer
    setIsPlaying(true);
    // console.log("reset");
  };

  const handleConnectBtn = async () => {
    setLoading(true);
    if (foundUser && foundUser.username) {
      try {
        const userToAdd = foundUser._id;
        console.log(userToAdd);
        const res = await axios.post("/api/v1/users/addfriend", {
          userToAdd: userToAdd
        }, {
          withCredentials: true
        });

        if (res.data) {
          console.log("Friend reuest sent:", res.data);
          setFinding(false);
          setIsPlaying(false);
          setKey((prevKey) => prevKey + 1);
        }
      } catch (error) {
        console.error("Error adding friend:", error);
      } finally{
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Container maxW={"90vw"}>
        <Header />
        <Stack
          as={Box}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 24 }}
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "center" }}
          width={"100%"}
        >
          {!finding ? (
            <Flex width={"70%"} justifyContent={"center"}>
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
            <Box
              width={"70%"}
              justifyContent={"center"}
              textAlign={{ base: "center", md: "left" }}
              pl={150}
            >
              <Heading
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                lineHeight={"110%"}
              >
                <Box>
                  {!loading && foundUser !== null ? (
                    <Flex direction={"column"} justifyContent={"space-between"}>
                      <Text
                        lineHeight={1.2}
                        fontSize={{ base: "2xl", sm: "2xl", md: "3xl" }}
                      >
                        {foundUser.shortBio}
                      </Text>

                      <Flex wrap="wrap" direction={"column"} mt={4}>
                        <Text fontSize={{ base: "lg", sm: "xl", md: "1.5xl" }}>
                          Top interests:
                        </Text>
                        <Flex wrap="wrap">
                          {foundUser.interests.map((interest, index) => (
                            <Text
                              fontWeight={400}
                              fontSize={{ base: "sm", sm: "lg", md: "xl" }}
                              key={`${foundUser._id}-${index}`}
                              mx={1}
                              my={2}
                              borderRadius={15}
                              lineHeight={1.5}
                              px={3}
                              py={1}
                              bg={"green.900"}
                              color={"white"}
                            >
                              {interest}
                            </Text>
                          ))}
                        </Flex>

                        <Flex
                          align="center"
                          p={4}
                          borderRadius="md"
                          boxShadow="md"
                        >
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="white"
                            mr={4}
                          >
                            Find them interesting?
                          </Text>
                          <Button
                            colorScheme="teal"
                            variant="solid"
                            _hover={{ bg: "teal.600" }}
                            _active={{
                              bg: "teal.700",
                              transform: "scale(0.98)",
                            }}
                            onClick={handleConnectBtn}
                          >
                            Connect with them
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  ) : (
                    <PacmanLoader color="#ffffff" size={75} />
                  )}
                </Box>
              </Heading>
            </Box>
          )}

          <VStack>
            <CountdownCircleTimer
              key={key} // Use key to force reset
              isPlaying={isPlaying}
              size={180}
              duration={8}
              trailColor={"#000000"}
              colors={["#ffffff", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => timerComplete()}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>

            {!finding ? (
              <></>
            ) : (
              <Button
                onClick={() => {
                  setIsPlaying(false);
                  setFinding(false);
                  setFoundUser(null);
                  setKey((prevKey) => prevKey + 1);
                }}
              >
                Stop and go back! 
              </Button>
            )}
          </VStack>
        </Stack>
      </Container>
    </div>
  );
};

export default Finder;
