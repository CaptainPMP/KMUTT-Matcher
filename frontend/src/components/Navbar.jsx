import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">KMUTT Matcher</div>
        <div className="space-x-4">
          <Link to='/login' className="hover:bg-gray-600 px-3 py-2 rounded">Login</Link>
          <Link to='/register' className="hover:bg-gray-600 px-3 py-2 rounded">Register</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar