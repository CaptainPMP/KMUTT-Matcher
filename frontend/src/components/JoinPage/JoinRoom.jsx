import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../../lib/axios';

function JoinRoom() {
  const location = useLocation();
  const email = location.state.id;
  const password = location.state.pass;

  const [groupName, setGroupName] = useState('');
  const history = useNavigate();

  const handleJoinRoom = async () => {
    try {
      // Send a request to the API to join the group
      const response = await axiosInstance.post('/users/joinGroup', {
        group_name: groupName,
        group_membersName: email,
      });
  
      // Handle the response as needed
      console.log('Joined Group:', response.data);
  
      // Convert the response data to a string for the alert
      const responseDataString = JSON.stringify(response.data);
      
      // Show the alert with the response data
      alert("Join Successful");
  
      // Navigate to the main page
      history('/main', { state: { id: email, pass: password } });
    } catch (error) {
      console.error('Error joining group:', error.response.data.error);
      alert(error.response.data.error);
      // Handle errors
    }
  };
  
  return (
    <div className='text-white max-w-screen-2xl mx-auto'>
      <h1 className='MakeRoomText font-semibold mt-14'>Join Group</h1>
      <h2 className='text-7xl font-semibold '>Please enter your details</h2>
      <input
        type='text'
        name='groupName'
        id='groupName'
        className='RoomName mt-14 my-10 text-red-500 text-center text-4xl font-semibold'
        placeholder='Enter group name to join'
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <div>
        <button
          className='btn btn-xs text-3xl sm:btn-sm md:btn-md lg:btn-lg hover:bg-cyan-600 rounded-full bg-green-400 py-6 px-7 font-semibold'
          onClick={handleJoinRoom}
        >
          Join Group
        </button>
      </div>
    </div>
  );
}

export default JoinRoom;
