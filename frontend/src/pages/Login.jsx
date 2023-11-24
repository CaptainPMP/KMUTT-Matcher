/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Eye, EyeSlash  } from "phosphor-react";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="********"
                />
                <button
                  className="absolute inset-y-0 right-0 mt-2 mr-2"
                  onClick={togglePasswordVisibility}
                  type="button"
                >
                  {passwordVisible ? <Eye /> : <EyeSlash />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">&copy; 2023 My App. All rights reserved.</p>
        </div>
      </div>
    </div>
);
};

export default Login;
