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
      <div className='flex flex-row'>
        <div className='w-2/5 bg-blue-00 mt-8 relative'>
          <img className='absolute pl-11 left-12 pt-20' src='https://media.discordapp.net/attachments/1162025185524846636/1186689394879512607/image.png?ex=6594299f&is=6581b49f&hm=a411d78df9c45515128a0a485bb3a607e15326e78b979b1944fadc83dbfcfd29&=&format=webp&quality=lossless'></img>
          <img className='absolute pl-16 left-20 bottom-3' src='https://media.discordapp.net/attachments/1162025185524846636/1186689620537266227/image.png?ex=659429d5&is=6581b4d5&hm=669376b9b7b358578e89f668bcb15d55c0aa430bbc3e349b2390772f89419e71&=&format=webp&quality=lossless'></img>
        </div>
        <div className="w-3/4 bg-red-00 mx-auto mt-8 text-center ">
          <h1 className='text-8xl text-white font-extra pt-20 mt-20'>WELCOME TO</h1>
          <h1 className='text-8xl text-white font-extra pt-10'>KMUTT MATCHER</h1>
          <p className="text-2xl text-white mt-4 pt-10 pb-20 mx-20">
            This application is designed to help you create groups of people based on their MBTI personality types. Whether you're organizing team-building events, workshops, or any other group activity, this app will assist you in forming balanced and harmonious groups.
            This app can help you save time and resources by finding the right people for your group.
          </p>
          <Link to="/home" className="bg-blue-500 text-white text-xl px-5 py-5 rounded-full hover:bg-blue-600 ">Go to homepage</Link>
        </div>
      </div>
    </div>
  )
}

export default Landing