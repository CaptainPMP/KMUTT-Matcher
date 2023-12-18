import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios';

const JoinGroup = () => {
  const [groupId, setGroupId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    axiosInstance
      .post('/api/joinGroup', {
        groupId,
      })
      .then((res) => {
        // Handle success, e.g., redirect to the joined group page
        navigate(`/group/${res.data.id}`);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className={`mb-4 ${error ? 'border-red-500' : ''}`}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="groupId">
                Group ID
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
                id="groupId"
                type="text"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                placeholder="Enter group ID"
                required
              />
              {error && (
                <p className="text-red-500 text-xs italic">{error}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type="submit"
              >
                {isLoading ? 'Joining...' : 'Join Group'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JoinGroup;
