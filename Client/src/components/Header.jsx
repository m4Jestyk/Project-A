import React, { useState, useEffect } from "react";
import { Spinner, Text, Flex, Button, Box } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/slices/themeSlice.js";
import { clearUser } from "../store/slices/userSlice.js";
import Requests from "./Requests.jsx";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [requestTab, setRequestTab] = useState(false);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [pendingR, setPendingR] = useState([]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      console.log("fetch");
      const res = await axios.post("/api/v1/users/logout");
      const data = await res.data;
      dispatch(clearUser());
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };

  const handleToggleFR = () => {
    setRequestTab((prevState) => !prevState);
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/v1/users/getrequests");
      const userIds = await res.data;
      setPendingR(userIds);
      console.log(pendingR);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

        {/* <Button
          mt={15}
          onClick={handleToggleTheme}
          colorScheme={theme === "light" ? "blue" : "yellow"} // Adjust button color based on the current theme
        >
          Toggle Theme
        </Button> */}

        {userState.id ? (
          <Flex>
            {requestTab ? <Box>
              <Requests/>
            </Box> : <></>}
            <Flex flexDirection={"row"} alignItems="center">
              <Button mt={2} onClick={() => navigate("/requests")}>
                {pendingR.length} Request pending
              </Button>
              {loading ? (
                <Spinner ml={4} mt={17} color="red.500" />
              ) : (
                <Text
                  ml={4} // Add margin-left for spacing
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
            </Flex>
          </Flex>
        ) : (
          <div></div>
        )}
      </Flex>
    </div>
  );
};

export default Header;
