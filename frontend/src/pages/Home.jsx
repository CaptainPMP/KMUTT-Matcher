import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import GroupBox from "../components/GroupBox";
import MyGroup from "../components/MyGroup";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { GroupState } from "../Context/GroupProvider";

const Home = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = GroupState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyGroup fetchAgain={fetchAgain} />}
        {user && (
          <GroupBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Home;
