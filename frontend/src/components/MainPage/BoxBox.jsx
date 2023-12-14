import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../../lib/axios';

function BoxBox() {
  const location = useLocation();
  const email = location.state.id;
  const password = location.state.pass;
  const history = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/users/groupsByGmail/' + email); // Replace with the actual Gmail value or use a variable
        setRooms(
          response.data.map((group) => (
            <button
              key={group.group_name}
              className='EachRoom p bg-red-100 rounded-3xl'
              onClick={() => handleRoomClick(email, password, group.group_name)}
            >
              <div>
                <div className=''>
                  <h1 className='Text1 Rainbow mt-4 font-bold '>{group.group_name}</h1>
                </div>
                <div>
                  <p className='Rainbow text-3xl mt-3'>{group.group_description}</p>
                </div>
              </div>
            </button>
          ))
        );
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchData();
  }, [email, password]); // Run the effect when the component mounts and whenever email or password changes

  const handleRoomClick = (email, password, groupName) => {
    history('/group/'+groupName, { state: { id: email, pass: password, groupName: groupName } });
  };

  return <div className='Room grid grid-flow-row gap-7 space-y-0 mx-auto '>{rooms}</div>;
}

export default BoxBox;
