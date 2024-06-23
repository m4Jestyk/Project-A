import React, { useState } from "react";
import { Spinner, Text, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
        console.log("fetch")
      const res = await axios.post("/api/v1/users/logout");
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };

  return (
    <div>
      <Flex
        bg={"black"}
        pb={4}
        position={"sticky"}
        top={0}
        justifyContent={"space-between"}
        ml={5}
        mr={5}
      >
        <Text
          fontWeight={500}
          fontSize={{ base: "l", sm: "m", md: "xl" }}
          lineHeight={"110%"}
          mt={15}
          cursor={"pointer"}
          onClick={() => navigate("/")}
        >
          p r o j e c t A
        </Text>

        <div>
          {loading ? (
            <Spinner mt={17} color="red.500" />
          ) : (
            <Text
              fontWeight={500}
              fontSize={{ base: "l", sm: "s", md: "m" }}
              lineHeight={"110%"}
              mt={17}
              cursor={"pointer"}
              color={"red.500"}
              onClick={handleLogout}
              _hover={{
                color: "red.200",
                transition: "0.5s",
              }}
            >
              Logout
            </Text>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default Header;
