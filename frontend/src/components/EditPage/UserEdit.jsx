import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../lib/axios';

function UserEdit() {
  const location = useLocation();
  const email = location.state.id;
  const password = location.state.pass;
  const [fullName, setFullName] = useState('');

  // Use useNavigate hook to get the history object
  const navigate = useNavigate();

  const GotoMbtiPage = async (e) => {
    // Use the navigate function to redirect to '/mbti_collecting'
    navigate("/mbti_collecting", { state: { id: email, pass: password } });
  }

  useEffect(() => {
    // Function to fetch full name from the server
    const fetchFullName = async () => {
      try {
        // Call the API endpoint to search for full name
        const response = await axiosInstance.post('/users/searchFullName', {
          gmail: email,
          password: password,
        });

        // If successful, set the full name in state
        setFullName(response.data.full_name);
      } catch (error) {
        console.error('Error fetching full name:', error);
        // Handle errors
      }
    };

    // Call the fetchFullName function when the component mounts
    fetchFullName();
  }, [email, password]);

  return (
    <div>
      <div className='text-white text-center text-6xl mb-10 mt-5'>MBTI :</div>
      <div className='EditAccount max-w-screen-2xl 0 flex flex-row mx-auto '>
        <div className='stblock w-2/5 bg- flex flex-col items-start justify-items-center '>
          <img
            className="UserPic bg-red-500 rounded-full mx-auto"
            src="https://cdn.discordapp.com/attachments/463329836174409730/1174800497450958858/1-removebg-preview.png?ex=6568e939&is=65567439&hm=7a0ce765ba85734bdd406da7764c04657430dc4b9170e26e316ddec66bfb6b2b&"
            alt="user photo"
          />
          <button type="button" className='EDIT bg-white text-4xl font-bold px-10 py-5 mt-3 mx-auto rounded-full'>
            EDIT
          </button>
        </div>

        <div className='UserInfo w-3/5 bg-gree py-20 '>
          <div className='text-4xl text-white '>Email : <span className='underline underline-offset-4'>{email}</span></div>
          <div className='text-4xl text-white pt-14'>Full Name : <span className='underline underline-offset-4' >{fullName}</span></div>
          <div className='text-4xl text-white pt-14'>Password : </div>
          <div className='mt-10'>
            <button type="button" className='text-3xl font-bold px-10 py-5 mt-3 mx-auto rounded-full bg-red-500' onClick={GotoMbtiPage}>
              กรอกข้อมูล MBTI
            </button>
          </div>
          <div className='mt-14'>
            <a href='https://sakinorva.net/functions?lang=th' className='text-3xl font-bold px-10 py-5 mt-3 mx-auto rounded-full bg-green-500'>ทำแบบทดสอบ MBTI</a>
          </div>
        </div>
      </div>
      <div className=' bg-blue-500 flex justify-end items-end font-bold mx-20'>
        <button className='DeleteAcc bg-red-500 rounded-full w-20'>Delete Account</button>
      </div>
    </div>
  );
}

export default UserEdit;
