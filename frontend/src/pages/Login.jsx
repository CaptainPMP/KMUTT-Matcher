/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash  } from "phosphor-react";
import { axiosInstance } from "../../lib/axios";
import { Button, useToast } from "@chakra-ui/react";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const user = {email, password}

    console.log("submited: ", user);

    axiosInstance.post("/users/login", user)
        .then((res) => {
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          setLoading(false);
          if(res.status === 201){
            navigate('/home')
          }
          toast({
            title: 'Logged In!',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
            
        })
        .catch((error) => {
          toast({
            title: 'Login denied!',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        })  
  }
  return (
    <div>
      {/* <Navbar /> */}
          <form className="bg-white rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                value={email}
                onChange={((e) => setEmail(e.target.value))}
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
            <Button
                // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                // type="submit"
                colorScheme="blue"
                width="100%"
                color="white"
                style={{marginTop: 15}}
                type="submit"
                isLoading={loading}
              >
                Login
              </Button>
            </div>
          </form>
    </div>
);
};

export default Login;
