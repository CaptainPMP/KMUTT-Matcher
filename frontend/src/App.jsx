/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

export const DataContext = createContext();

function App() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    full_name: "",
    email: "",
  })

  return (
    <DataContext.Provider value={{ userInfo, setUserInfo }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </DataContext.Provider>
    
  );
}

export default App
