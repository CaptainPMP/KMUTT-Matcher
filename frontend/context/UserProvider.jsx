// UserProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import { Routes, Route } from 'react-router-dom'

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const location = useLocation()
  useEffect(() => {
    // let userInfo = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // const userInfo = Cookies.get('token')
    const userInfo = localStorage.getItem('token');
    setUser(userInfo);

    if (!user && (location.pathname != '/login') && (location.pathname != '/register')) navigate("/");
    console.log("user: ", user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
