import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [selectedGroup, setSelectedGroup] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [groups, setGroups] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) navigate("/auth");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <GroupContext.Provider
      value={{
        selectedGroup,
        setSelectedGroup,
        user,
        setUser,
        notification,
        setNotification,
        groups,
        setGroups,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const GroupState = () => {
  return useContext(GroupContext);
};

export default GroupProvider;
