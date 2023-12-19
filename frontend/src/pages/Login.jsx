/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash  } from "phosphor-react";
import { axiosInstance } from "../../lib/axios";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
// import { Button, useToast } from "@chakra-ui/react";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();

    const user = {email, password}

    console.log("submited: ", user);

    axiosInstance.post("/api/login", user)
        .then((res) => {
          setIsLoading(false)
          navigate('/home')
        })
        .catch((error) => {
          setIsLoading(false)
          Swal.fire({
            title: 'Email or password is not correct',
            icon: 'error',
            confirmButtonText: 'Ok',
          })
          console.log(error);
        })  
    }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-20">
        <div className="w-full max-w-2xl">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4 shadow-xl">
              <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                value={email}
                onChange={((e) => setEmail(e.target.value))}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6 shadow-xl">
              <label className="block text-gray-700 text-xl  font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="********"
                  value={password}
                  onChange={((e) => setPassword(e.target.value))}
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
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
            >
              {isLoading? <ClipLoader /> : "Login" }
            </button>

            </div>
          </form>
          <p className="text-center text-gray-100 text-xs">&copy; 2023 My App. All rights reserved.</p>
        </div>
      </div>
    </div>
);
};

export default Login;
