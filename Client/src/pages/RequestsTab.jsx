import { Box, Container, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import RequestsCells from "../components/RequestCells";

export default function RequestsTab() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

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

  const removeUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user !== userId));
  };

  return (
    <Container maxW={"90vw"}>
      <Header />
      {users.length != 0 ? (
        <Flex flexDirection={"column"}>
          {users.map((user, index) => (
            <Box key={index}>
              <RequestsCells userId={user} onRemove={removeUser} />
            </Box>
          ))}
        </Flex>
      ) : (
        <Flex h={'80vh'} flexDirection={"column"} justifyContent={"space-around"}>
          <Flex justifyContent={"space-around"}>
            <Text fontWeight={600}>Nothin to see here :(</Text>
          </Flex>
        </Flex>
      )}
    </Container>
  );
}
