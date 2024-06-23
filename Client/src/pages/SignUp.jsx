"use client";

import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Login from "../components/Login";


const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const [cookies, removeCookie] = useCookies([]);
    const [isLogin, setisLogin] = useState(true);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();
  console.log(cookies.cookiemonster);


  useEffect(()=>{
    const verifyCookie = async() => {
        if(!cookies.cookiemonster){
            navigate("/signup");
        }
        else{
          navigate("/");
        }
    };
    verifyCookie();
}, [cookies, navigate])

  const handleFormChange = async() => {
    console.log(inputs);
    setLoading(true);
    try {
        const res = await fetch("/api/v1/users/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputs),
        });

        const data = await res.json();
        console.log(data);

        if(data.success === true)
          {
            console.log("Redirecting")
            navigate("/login");
          }

    } catch (error) {
        console.log(error);
    } finally{
        setLoading(false);
    }
  };

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            connect with people{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              based on
            </Text>{" "}
            insticts before the tick tocks!
          </Heading>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              become a part{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              you can be anonymous, all we want is your email and a strong
              password {">"}:)
            </Text>

            <Text onClick={ () => navigate("/login")} cursor={"pointer"} color={"green.500"} fontSize={{ base: "sm", sm: "md" }}>
              already a member? click me!!
            </Text>
          </Stack>
          <Box as={"form"} mt={0}>
            <Stack spacing={4}>
              <Input
                onChange={(e) =>
                  setInputs((inputs) => ({
                    ...inputs,
                    username: e.target.value,
                  }))
                }
                placeholder="a cool username"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                onChange={(e) =>
                  setInputs((inputs) => ({
                    ...inputs,
                    email: e.target.value,
                  }))
                }
                placeholder="email@something.whatever"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                onChange={(e) =>
                  setInputs((inputs) => ({
                    ...inputs,
                    password: e.target.value,
                  }))
                }
                placeholder="password (sshhh...)"
                type="password"
                name="password"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            </Stack>
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
              onClick={handleFormChange}
            >
              Lesgo!
            </Button>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}
