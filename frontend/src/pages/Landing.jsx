/* eslint-disable no-unused-vars */
import React from 'react'
import Button from "../components/Button";
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    // <div>
    //   <nav>
    //       <Button dest="/login">Login</Button>
    //       <Button dest="/register">Register</Button>
    //     </nav>
    //     <div className="container p-4">

    //         <Button dest="/home">Start match your close MBTI friends</Button>
    //     </div>
    // </div>

    <div>
      <Navbar />
      <div className="container mx-auto mt-8 text-center">
        <h1 className="text-4xl font-bold mb-4">KMUTT Matcher</h1>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Odio ut sem nulla pharetra.
        </p>
        <Link to="/home" className="bg-blue-500 text-white px-4 py-2 rounded">Go to homepage</Link>
      </div>
    </div>
  )
}

export default Landing