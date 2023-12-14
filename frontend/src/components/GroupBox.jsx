import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleGroup from "./SingleGroup";
import { GroupState } from "../Context/GroupProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = GroupState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleGroup fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
