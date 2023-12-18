/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { axiosInstance } from '../../lib/axios';
import { DataContext } from '../App';
import { useContext } from 'react';
import Footer from '../components/Footer';
import GroupCard from '../components/GroupCard';

const Home = () => {
  const { userInfo, setUserInfo } = useContext(DataContext);
  const navigate = useNavigate();
  const [userGroups, setUserGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    axiosInstance
      .get('/api/logout')
      .then((res) => {
        setUserInfo({
          id: '',
          full_name: '',
          email: '',
          isLogin: false,
          });
          localStorage.clear('userInfo')
        navigate('/login');
      })
      .catch((err) => {
        console.log('logout error is:', err);
      });
  };

  const handleDeleteGroup = (groupId) => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this group?');
  
    // If user confirms, proceed with the deletion
    if (isConfirmed) {
      axiosInstance
        .delete(`/api/group/${groupId}`)
        .then((res) => {
          // If the deletion is successful, update the userGroups state
          setUserGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
        })
        .catch((error) => {
          console.error('Error deleting group:', error);
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    // Check token when the component mounts
    axiosInstance
      .get('/api/checkToken')
      .then((res) => {
        console.log("home res:", res);
        const userInfoObj = {
          id: res.data.token.id.id,
          full_name: res.data.token.id.full_name,
          email: res.data.token.id.email,
          isLogin: true,
        }
        setUserInfo(userInfoObj);
        localStorage.setItem("userInfo", JSON.stringify(userInfoObj))
      })
      .catch(() => {
        // If no token, navigate to login
        navigate('/login');
      });
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  useEffect(() => { 
    // Fetch user groups information
    axiosInstance
      .get(`/api/user/${userInfo.id}/groups`)
      .then((res) => {
        setUserGroups(res.data.groups);
        setIsLoading(false);
        // console.log("res", res);
        console.log(userInfo);
      })
      .catch((err) => {
        console.error('Error fetching user groups:', err);
      });
  }, [userInfo.id]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Hi {userInfo.full_name}</h1>
        <div className="flex flex-wrap">
          {isLoading && <p>Loading your groups...</p>}
          {!isLoading &&
            userGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                isAdmin={group.isAdmin}  
                onDeleteClick={handleDeleteGroup}
              />
            ))}
        </div>
        <Link to="/" className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleLogout}>
          Logout
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
