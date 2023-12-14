import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/GroupLogics";
import GroupLoading from "./GroupLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { GroupState } from "../Context/GroupProvider";

const MyGroup = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedGroup, setSelectedGroup, user, groups, setGroups } = GroupState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:4000/group", config);
      setGroups(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    console.log("Groups: ",groups);
    
    // console.log("Group name:", groups[0].group_name);
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedGroup ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {groups ? (
          <Stack overflowY="scroll">
            {groups.map((group) => (
              <Box
                onClick={() => setSelectedGroup(group)}
                cursor="pointer"
                bg={selectedGroup === group ? "#38B2AC" : "#E8E8E8"}
                color={selectedGroup === group ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={group._id}
              >
                <Text>
                  {!group.isGroupChat
                    ? getSender(loggedUser, group.users)
                    : group.group_name}
                </Text>
                {group.latestMessage && (
                  <Text fontSize="xs">
                    <b>{group.latestMessage.sender.name} : </b>
                    {group.latestMessage.content.length > 50
                      ? group.latestMessage.content.substring(0, 51) + "..."
                      : group.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <GroupLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyGroup;
