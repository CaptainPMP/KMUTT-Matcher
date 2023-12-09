import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

function Login() {
  const history=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/users/login', {
        gmail: email,
        password: password,
      });


      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem('token', token);

      // Redirect to another page after successful login
      // You may replace '/dashboard' with your desired route
      history("/main",{state:{id:email,pass:password}})
    } catch (error) {
      console.error(error);

      // Handle login error
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <section className='mx-auto bg-blue-0'>
      <div className='LoginForm bg-yellow-0 flex flex-wrap flex-col items-center '>
        <div className='BoxLogin bg-zinc-950/60 rounded-md '>
          <div className='WelcomeText  bg-red-0 py-16 rounded-md '>
            <h1 className='text-center text-white text-2xl font-semibold'>Nice to see you again</h1>
            <h1 className='text-center  text-white text-7xl font-semibold '>WELCOME YOU</h1>
            <h1 className='text-center  text-white text-4xl font-semibold pt-5'> TO KMUTT MATCHER</h1>
          </div>
          <div className=' bg-green-0 flex flex-wrap flex-col items-center pb-20'>
            <h1 className=' text-center text-5xl font-semibold text-white'> Login</h1>

            {error && (
              <div className='text-red-500 text-center mt-5'>{error}</div>
            )}

            <input
              type="email"
              name="email"
              id="email"
              className="InfoLogin py-2 mt-12 text-center text-1xl font-semibold"
              placeholder="You@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
              type="password"
              name="password"
              id="password"
              className="InfoLogin py-2 mt-7 text-center text-1xl font-semibold"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className='flex flex-wrap flex-row justify-evenly bg-blue-00 w-full'>
              <button
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:bg-cyan-600 rounded-full bg-green-100 mt-10 py-3 px-20 font-semibold"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
