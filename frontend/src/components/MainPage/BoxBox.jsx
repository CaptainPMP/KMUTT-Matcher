import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from "react-router-dom"

function BoxBox() {
  const location=useLocation()
  const email = location.state.id
  const password = location.state.pass
  const history=useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users/groupsByGmail/'+email); // Replace with the actual Gmail value or use a variable
        setRooms(response.data.map((group) => (
          <button key={group.group_name} className='EachRoom p bg-red-400 rounded-3xl'>
            <div>
              <h1 className='text-white text-4xl mt-4 font-bold'>{group.group_name}</h1>
              <p className='text-white text-3xl mt-3'>{group.group_description}</p>
            </div>
          </button>
        )));
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchData();
  }, []); // Run the effect only once when the component mounts

  return (
    <div className='Room grid grid-flow-row gap-7 space-y-0 mx-auto '>
      {rooms}
    </div>
  );
}

export default BoxBox;
