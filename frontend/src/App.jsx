/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateGroup from './pages/CreateGroup';
import JoinGroup from './pages/JoinGroup';
import Group from './pages/Group';

export const DataContext = createContext();

function App() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    full_name: "",
    email: "",
    isLogin: false,
  })

  return (
    <DataContext.Provider value={{ userInfo, setUserInfo }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createGroup" element={<CreateGroup />} />
        <Route path="/joinGroup" element={<JoinGroup />} />
        <Route path="/group/:groupId" element={<Group />} />
      </Routes>
    </DataContext.Provider>
    
  );
}

export default App
