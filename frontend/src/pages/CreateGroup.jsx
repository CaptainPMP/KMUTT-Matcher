// CreateGroup.js
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios';
import { DataContext } from '../App';

const CreateGroup = () => {
  // const {userInfo, setUserInfo } = useContext(DataContext)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    axiosInstance
      .post('/api/createGroup', {
        groupName,
        groupDescription,
        userId: userInfo.id
      })
      .then((res) => {
        // Handle success, e.g., redirect to the created group page
        navigate(`/group/${res.data.id}`);
      })
      .catch((error) => {
        console.error('Error creating group:', error);
        setIsLoading(false);
      });

      
  };

  useEffect(() => {
    axiosInstance
      .get('/api/checkToken')
      .then((res) => {
        console.log("home res:", res);
      })
      .catch(() => {
        // If no token, navigate to login
        navigate('/login');
      });
  }, [userInfo]); // Empty dependency array means this effect runs only once when the component mounts

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-20">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4 shadow-xl">
              <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="groupName">
                Group Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="groupName"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                required
              />
            </div>
            <div className="mb-6 shadow-xl">
              <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="groupDescription">
                Group Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="groupDescription"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                placeholder="Enter group description"
                rows="4"
                required
              />
            </div>
            <div className="flex items-center justify-between ">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type="submit"
              >
                {isLoading ? 'Creating...' : 'Create Group'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateGroup;
