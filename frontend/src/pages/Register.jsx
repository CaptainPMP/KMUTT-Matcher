/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash  } from "phosphor-react";
// import axios from "axios"
import { axiosInstance } from "../../lib/axios";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const postDetails = (pics) => {
    setLoading(true);
    if(pics === undefined) {
      toast({
          title: 'Please Select an Image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
      });
      return;
    }

    if(pics.type === "image/jpeg" || "image/png"){
      const data = new FormData();
      data.append("file", pics)
      data.append("upload_preset", "KMUTT-Matcher")
      data.append("cloud_name", "dh08by69p")
      axios.post("https://api.cloudinary.com/v1_1/pawinnarut/image/upload", data)
      .then((res) => {
        console.log("cloudinary res:", res.data.url.toString());
        setPic(res.data.url.toString());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
    } else {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {full_name: fullname, email, password, confirm_password: confirmPassword, pic}

    if(!fullname || !email || !password || !confirmPassword){
      toast({
        title: 'You must fill in all input!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if(password !== confirmPassword) {
      toast({
        title: 'Password not same!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    

    console.log("submited: ", user);

    axiosInstance.post("/users/register", user)
        .then((res) => {
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          setLoading(false);
          if(res.status === 201){
            navigate('/home')
          }
            
        })
        .catch((error) => {
            console.log(error);
        })
  }

  return (
    <div>
      {/* <Navbar /> */}
          <form className="bg-white  rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Full name">
                Full name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={fullname}
                onChange={((e) => setFullName(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={((e) => setEmail(e.target.value))}
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
                  autoComplete="on"
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
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm_password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="********"
                  value={confirmPassword}
                  autoComplete="on"
                  onChange={((e) => setConfirmPassword(e.target.value))}
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
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">
                Upload your picture
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="upload_picture"
                  type="file"
                  name="myImage"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
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
                Register
              </Button>
            </div>
          </form>
    </div>
);
};

export default Register;
