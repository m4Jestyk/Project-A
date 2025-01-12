import { Box, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RequestCells from "./RequestCells";

const Requests = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/users/getrequests");
      const userIds = res.data;
      setUsers(userIds);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Flex flexDirection={"column"}>
      {/* {loading ? (
        <Text>Loading...</Text>
      ) : (
        users.map((user, index) => (
          <Box key={index}><RequestCells /></Box>
        ))
      )} */}

      <Text>{users.length}</Text>
    </Flex>
  );
};

export default Requests;
