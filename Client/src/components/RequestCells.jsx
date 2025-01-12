import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";

const RequestCells = (props) => {
  const [user, setUser] = useState({});
  const [readMore, setReadMore] = useState(false);

  const getProfile = async () => {
    if (props.userId) {
      try {
        const res = await fetch("/api/v1/users/getprofilebyid", {
          method: "POST",
          body: JSON.stringify({ userId: props.userId }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, [props.userId]);

  const handleAccept = async () => {
    try {
      const res = await fetch("/api/v1/users/acceptfriend", {
        method: "POST",
        body: JSON.stringify({
          userToAdd: props.userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      props.onRemove(props.userId);
    } catch (error) {
      console.log("Error while adding the friend");
    }
  };

  const handleDecline = async () => {
    try {
      const res = await fetch("/api/v1/users/declinefriend", {
        method: "POST",
        body: JSON.stringify({
          userToDecline: props.userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      props.onRemove(props.userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      bgColor={"#2D3748"}
      borderRadius={"md"}
      padding={4}
      marginY={4}
      shadow={"md"}
      _hover={{ shadow: "lg" }}
      width={["90vw", "80vw", "60vw", "40vw"]}
      transitionDuration={"0.2s"}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
      >
        <Flex direction={"column"} flex={"1"}>
          <Text color={"whiteAlpha.700"} fontSize={"md"} mb={2}>
            {user.shortBio || "No short bio available"}
          </Text>

          {readMore && (
            <Text color={"whiteAlpha.800"} fontSize={"sm"} mb={4}>
              {user.fullBio || "No detailed bio available"}
            </Text>
          )}

          <Flex alignItems={"center"}>
            <IconButton
              icon={readMore ? <ChevronUpIcon /> : <ChevronDownIcon />}
              aria-label={readMore ? "Show less" : "Read more"}
              onClick={() => setReadMore(!readMore)}
              size={"sm"}
              variant={"ghost"}
              colorScheme={"teal"}
              mr={2}
              transition={"all 0.2s ease-in-out"}
            />
            <Text
              fontSize={"sm"}
              color={"teal.400"}
              onClick={() => setReadMore(!readMore)}
              cursor={"pointer"}
            >
              {readMore ? "Show less" : "Read more"}
            </Text>
          </Flex>
        </Flex>

        <Flex alignItems={"center"} justifyContent={"flex-end"}>
          <IconButton
            icon={<CheckIcon />}
            aria-label="Accept request"
            colorScheme="green"
            onClick={handleAccept}
            size={"sm"}
            mr={2}
          />
          <IconButton
            icon={<CloseIcon />}
            aria-label="Decline request"
            colorScheme="red"
            onClick={handleDecline}
            size={"sm"}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default RequestCells;
