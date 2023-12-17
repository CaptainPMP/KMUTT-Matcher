/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from '../../lib/axios';
import { DataContext } from '../App';
import { useContext } from 'react';



const Home = () => {
  const {userInfo, setUserInfo } = useContext(DataContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    axiosInstance.get('/api/logout')
      .then((res) => {
        setUserInfo({
          id: "",
          full_name: "",
          email: "",
          isLogin: false
        })
        navigate('/login')
      })
      .catch((err) => {
        console.log("logout error is:", err)
      })
  }


  useEffect(() => {
    axiosInstance.get('/api/checkToken')
      .then((res) => {
        console.log("res: ", res);
        setUserInfo({
          id: res.data.token.id.id,
          full_name: res.data.token.id.full_name,
          email: res.data.token.id.email,
          isLogin: true
        })
      })
      .catch((err) => navigate('/login'))
  },[])

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Hi {userInfo.full_name}</h1>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Odio ut sem nulla pharetra.
        </p>
        <Link to="/" className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleLogout}>Logout</Link>
      </div>
    </div>
  )
}

export default Home