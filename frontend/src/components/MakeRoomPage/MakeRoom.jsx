import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { axiosInstance } from '../../../lib/axios';

function MakeRoom() {
  const location=useLocation()
  const email = location.state.id
  const password = location.state.pass
  
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const history=useNavigate();

  const handleCreateRoom = async () => {
    try {
      const response = await axiosInstance.post('/users/createGroup', {
        group_name: groupName,
        group_description: groupDescription,
        group_host: email,
      });

      console.log('Group created:', response.data);
      alert('สร้างกลุ่มเสร็จสิ้น');
      history("/main",{state:{id:email,pass:password}});
      // You can handle the response as needed
    } catch (error) {
      console.error('Error creating group:', error.response.data.error);
      alert(error.response.data.error)
      // Handle errors
    }
  };

  return (
    <div className='text-white max-w-screen-2xl mx-auto'>
      <h1 className='MakeRoomText font-semibold mt-14'>Create Your Group</h1>
      <h2 className='text-7xl font-semibold '>Please enter your detail</h2>
      <input
        type="text"
        name="groupName"
        id="groupName"
        className="RoomName mt-14 text-red-500 text-center text-4xl font-semibold"
        placeholder="Enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <input
        type="text"
        name="groupDescription"
        id="groupDescription"
        className="RoomDesc text-center mt-5 my-10 text-red-500 text-4xl font-semibold"
        placeholder="Enter group description"
        value={groupDescription}
        onChange={(e) => setGroupDescription(e.target.value)}
      />
      <div>
        <button
          className="btn btn-xs text-3xl sm:btn-sm md:btn-md lg:btn-lg hover:bg-cyan-600 rounded-full bg-green-400 py-6 px-7 font-semibold"
          onClick={handleCreateRoom}
        >
          Create Group
        </button>
      </div>
    </div>
  );
}

export default MakeRoom;
