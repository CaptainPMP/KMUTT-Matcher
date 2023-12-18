import React, { useContext, useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios';
import { DataContext } from '../App';

const Group = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  // const { userInfo, setUserInfo } = useContext(DataContext);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [isCopy, setIsCopy] = useState(false)
  const navigate = useNavigate();
  const groupIdRef = useRef(null);

  useEffect(() => {
    // Fetch group details based on the groupId
    axiosInstance
      .get(`/api/group/${groupId}`)
      .then((res) => {
        console.log("get api group", res);
        setGroupDetails(res.data);
        console.log("userInfo ", userInfo);
        console.log("group details is",groupDetails);
      })
      .catch((error) => {
        console.error('Error fetching group details:', error);
      });

  }, [groupId]);

  useEffect(() => {
    axiosInstance
      .get('/api/checkToken')
      .then((res) => {
        console.log("res is", res);
      })
      .catch(() => {
        // If no token, navigate to login
        navigate('/login');
      });
  }, [])


  const handleCopyToClipboard = () => {
    // Use the Clipboard API to copy the groupId to the clipboard
    groupIdRef.current.select();
    document.execCommand('copy');
    setIsCopy(true)
  };

  if (!groupDetails) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto mt-8 text-center">
          <p>Loading group details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const renderPersonCards = () => {
    return groupDetails.users.map((user) => (
      <div key={user.id} className="border rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 group relative">
        <h2 className="text-lg font-semibold">
          {user.full_name} {userInfo.id === user.id ? "(Me)" : ""}
        </h2>
        <p className="text-sm text-gray-500 opacity-100 transition-opacity">
          {user.email}
        </p>
        {userInfo.id === groupDetails.admin_id && userInfo.id !== user.id && (
          <button
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleDeleteUser(user.id)}
            disabled={user.isDeleting}
          >
            {user.isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    ));
  };
  
  const handleDeleteUser = (userId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this user?");
    
    if (!shouldDelete) {
      return; // User canceled the deletion
    }

    // Find the user by ID and set the isDeleting state to true
    setGroupDetails((prevGroupDetails) => {
      const updatedUsers = prevGroupDetails.users.map((user) => {
        if (user.id === userId) {
          return { ...user, isDeleting: true };
        }
        return user;
      });
      return {
        ...prevGroupDetails,
        users: updatedUsers,
      };
    });
  
    // Implement the logic to delete the user from the group
    axiosInstance
      .delete(`/api/group/${groupDetails.id}/removeUser/${userId}`, userInfo.id)
      .then((res) => {
        // Update the UI or perform any necessary actions upon successful deletion
        console.log(`User ${userId} deleted successfully`);
  
        // Filter out the deleted user from the state
        setGroupDetails((prevGroupDetails) => {
          const updatedUsers = prevGroupDetails.users.filter((user) => user.id !== userId);
          return {
            ...prevGroupDetails,
            users: updatedUsers,
          };
        });
      })
      .catch((error) => {
        console.error(`Error deleting user ${userId}:`, error);
      });
  };
  
  

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{groupDetails.group_name}</h1>
        <p className="text-gray-600 mb-4">{groupDetails.group_description}</p>
        
        {/* Display groupId and provide a button to copy it to clipboard */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Group ID
          </label>
          <div className="flex items-center">
            <input
              ref={groupIdRef}
              type="text"
              value={groupId}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              readOnly
            />
            <button
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCopyToClipboard}
            >
              {isCopy? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderPersonCards()}
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default Group;
