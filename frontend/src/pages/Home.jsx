/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Homepage</h1>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Odio ut sem nulla pharetra.
        </p>
        <Link to="/" className="bg-red-600 text-white px-4 py-2 rounded">Logout</Link>
      </div>
    </div>
  )
}

export default Home