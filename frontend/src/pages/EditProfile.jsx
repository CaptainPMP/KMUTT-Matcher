import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { axiosInstance } from '../../lib/axios';
import Swal from 'sweetalert2';

const EditProfile = () => {
  // Initialize state for form fields
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const navigate = useNavigate();

  // Fetch user profile data when the component mounts
  useEffect(() => {
    axiosInstance
      .get(`/api/user/profile/${userInfo.id}`)
      .then((res) => {
        const { full_name, email, gender, description } = res.data.userProfile;
        setFullName(full_name || '');
        setEmail(email || '');
        setGender(gender || '');
        setDescription(description || '');
        console.log("user info get is",res);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();

    try {
      // Make an API call to update the user profile
      const response = await axiosInstance.put(`/api/updateUser/${userInfo.id}`, {
        full_name: fullName,
        email,
        gender,
        description,
      });

      console.log('Profile updated successfully:', response.data);
      Swal.fire({
        title: 'Profile updated successfully!',
        icon: 'success',
        confirmButtonText: 'Ok',
      })
      setIsLoading(false)

      // You can perform additional actions upon successful update if needed
    } catch (error) {
      console.error('Error updating user profile:', error);
      Swal.fire({
        title: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Ok',
      })
      setIsLoading(false)
      // Handle error, show a notification, etc.
    }
  };

  const handleDeleteAccount = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsDeleteButtonLoading(true)
          // Make an API call to delete the user account
          const response = await axiosInstance.delete(`/api/deleteUser/${userInfo.id}`);
  
          console.log('Account deleted successfully:', response.data);

          Swal.fire({
            title: "Deleted!",
            text: "Your account has been deleted.",
            icon: "success"
          });
          
          localStorage.clear('userInfo')
          navigate('/login')
          setIsDeleteButtonLoading(false)
  
          // Perform additional actions upon successful deletion, e.g., redirect to the login page
        } catch (error) {
          console.error('Error deleting user account:', error);
          setIsDeleteButtonLoading(false)
          // Handle error, show a notification, etc.
        }
        
      }
    });
  };

  return (
  <div>
    <Navbar />
    <div className="container mx-auto mt-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Full Name
            </label>
            <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              disabled // Add disabled attribute
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender
            </label>
            <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            </select>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
            </label>
            <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className={`ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isDeleteButtonLoading ? 'cursor-not-allowed opacity-50' : ''
              }`}
              onClick={handleDeleteAccount}
              disabled={isDeleteButtonLoading}
            >
              {isDeleteButtonLoading ? "Deleting Account..." : "Delete Account"}
            </button>
          </div>
        </form>
    </div>
        <Footer />
  </div>
    
  );
};

export default EditProfile;
