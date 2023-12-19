// UserInfo.js

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios';
import { DataContext } from '../App';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserInfo = () => {
  const { userId } = useParams();
  const { userInfo } = useContext(DataContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Fetch user details based on the userId parameter
    axiosInstance
      .get(`/api/user/details/${userId}`)
      .then((res) => {
        setUserDetails(res.data.userDetails);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        // Handle error, e.g., redirect to an error page
      });
  }, [userId]);

  if (!userDetails) {
    return (
      <div className="text-center mt-8">
        <p>Loading user details...</p>
      </div>
    );
  }

  return (
    <div>
        <Navbar />
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">User Information</h1>
            <p className="mb-2"><span className="font-bold">Full Name:</span> {userDetails.full_name}</p>
            <p className="mb-2"><span className="font-bold">Email:</span> {userDetails.email}</p>
            <p className="mb-2"><span className="font-bold">Gender:</span> {userDetails.gender}</p>
            <div className="mt-4">
                <h2 className="text-lg font-bold mb-2">Social Media</h2>
                <p className="mb-2"><span className="font-bold">Line:</span> {userDetails.socialmedia?.line || 'N/A'}</p>
                <p className="mb-2"><span className="font-bold">Facebook:</span> {userDetails.socialmedia?.facebook || 'N/A'}</p>
                <p className="mb-2"><span className="font-bold">Instagram:</span> {userDetails.socialmedia?.instagram || 'N/A'}</p>
                <p className="mb-2"><span className="font-bold">Phone:</span> {userDetails.socialmedia?.phone || 'N/A'}</p>
            </div>
        </div>
        <Footer />
    </div>
    
  );
};

export default UserInfo;
