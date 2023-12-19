import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { axiosInstance } from '../../lib/axios';
import Swal from 'sweetalert2';

const EditContact = () => {
  // Initialize state for form fields
  const [isLoading, setIsLoading] = useState(false);
  const [line, setLine] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [phone, setPhone] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Fetch user contact data when the component mounts
  useEffect(() => {
    axiosInstance
      .get(`/api/user/contact/${userInfo.id}`)
      .then((res) => {
        const { line, facebook, instagram, phone } = res.data.userContact;
        setLine(line || '');
        setFacebook(facebook || '');
        setInstagram(instagram || '');
        setPhone(phone || '');
        console.log("contact info get is", res);
      })
      .catch((error) => {
        console.error('Error fetching user contact:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      // Make an API call to update the user contact information
      const response = await axiosInstance.put(`/api/updateContact/${userInfo.id}`, {
        line,
        facebook,
        instagram,
        phone,
      });

      console.log('Contact information updated successfully:', response.data);
      Swal.fire({
        title: 'Contact information updated successfully!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      setIsLoading(false);

      // You can perform additional actions upon successful update if needed
    } catch (error) {
      console.error('Error updating user contact information:', error);
      Swal.fire({
        title: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      setIsLoading(false);
      // Handle error, show a notification, etc.
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full max-w-xl mx-auto  text-center bg-gray-100 shadow-md rounded mt-20 px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-6">Edit Contact</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4 shadow-xl">
            <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="line">
              Line
            </label>
            <input
              type="text"
              id="line"
              name="line"
              value={line}
              onChange={(e) => setLine(e.target.value)}
              className="appearance-none border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 shadow-xl">
            <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="facebook">
              Facebook
            </label>
            <input
              type="text"
              id="facebook"
              name="facebook"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="appearance-none border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              
            />
          </div>
          <div className="mb-4 shadow-xl">
            <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="instagram">
              Instagram
            </label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="appearance-none border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              
            />
          </div>
          <div className="mb-4 shadow-xl">
            <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="appearance-none border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              
            />
          </div>
          <div className="mb-4 ">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading ? 'cursor-not-allowed opacity-50' : ''
                }`}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditContact;
