"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function QuestionsUpdater() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [cookies, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.cookiemonster) {
        navigate("/login");
      } else {
        navigate("/questionupdate");
      }

      const res = await fetch("/api/v1/users/getprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userState.username }),
      });

      const data = await res.json();
      setUser(data);
    };
    verifyCookie();
  }, [cookies, navigate]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...(user.questions || [])];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setUser({
      ...user,
      questions: updatedQuestions,
    });
  };

  const addQuestion = () => {
    setUser({
      ...user,
      questions: [...(user.questions || []), { question: "", answer: "" }],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...(user.questions || [])];
    updatedQuestions.splice(index, 1);
    setUser({
      ...user,
      questions: updatedQuestions,
    });
  };

  return (
    <Container maxW={"90vw"}>
      <Header />
      <Flex
        bg={useColorModeValue("black.100", "black.900")}
        align="center"
        justify="center"
      >
        <Box
          borderRadius="lg"
          m={{ base: 5, md: 16, lg: 10 }}
          p={{ base: 5, lg: 16 }}
        >
          {loading ? (
            <PacmanLoader color="#FFFFFF" size={75} />
          ) : (
            <Box>
              <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
                <Heading
                  fontSize={{
                    base: "4xl",
                    md: "5xl",
                  }}
                >
                  Let's set up your profile!
                </Heading>

                <Stack
                  spacing={{ base: 4, md: 8, lg: 20 }}
                  direction={{ base: "column", md: "row" }}
                >
                  <Box
                    bg={useColorModeValue("gray.800", "gray.700")}
                    borderRadius="lg"
                    p={8}
                    color={useColorModeValue("white.700", "whiteAlpha.900")}
                    shadow="base"
                  >
                    <VStack spacing={5}>
                      {/* Other profile fields */}

                      <FormControl isRequired>
                        <FormLabel>Your Questions and Answers</FormLabel>
                        {user.questions?.map((q, index) => (
                          <Box key={index} mb={4}>
                            <FormLabel>Question {index + 1}</FormLabel>
                            <Input
                              placeholder={`Enter question ${index + 1}`}
                              value={q.question}
                              onChange={(e) =>
                                handleQuestionChange(index, "question", e.target.value)
                              }
                            />

                            <FormLabel>Answer {index + 1}</FormLabel>
                            <Input
                              placeholder={`Enter answer ${index + 1}`}
                              value={q.answer}
                              onChange={(e) =>
                                handleQuestionChange(index, "answer", e.target.value)
                              }
                            />
                            <Button
                              mt={2}
                              colorScheme="red"
                              onClick={() => removeQuestion(index)}
                            >
                              Remove
                            </Button>
                          </Box>
                        ))}

                        <Button
                          mt={4}
                          colorScheme="blue"
                          onClick={addQuestion}
                        >
                          Add New Question
                        </Button>
                      </FormControl>

                      <Button
                        colorScheme="blue"
                        bg="blue.400"
                        color="white"
                        _hover={{
                          bg: "blue.500",
                        }}
                        width="full"
                        onClick={handleSubmit}
                      >
                        All done!
                      </Button>
                    </VStack>
                  </Box>
                </Stack>
              </VStack>
            </Box>
          )}
        </Box>
      </Flex>
    </Container>
  );
}
