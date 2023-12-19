import React, { useContext, useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios';
import { DataContext } from '../App';
import Swal from 'sweetalert2';

const Group = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [isCopy, setIsCopy] = useState(false)
  const navigate = useNavigate();
  const groupIdRef = useRef(null);
  const [numberOfGroups, setNumberOfGroups] = useState(1);

  useEffect(() => {
    // Fetch group details based on the groupId
    axiosInstance
      .get(`/api/group/${groupId}`)
      .then((res) => {
        setGroupDetails(res.data);
      })
      .catch((error) => {
        console.error('Error fetching group details:', error);
        // Redirect user to home page or an error page if not a member of the group
        navigate('/home');
      });

  }, [groupId, navigate]);

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
  }, [navigate]);

  const handleCopyToClipboard = () => {
    // Use the Clipboard API to copy the groupId to the clipboard
    groupIdRef.current.select();
    document.execCommand('copy');
    setIsCopy(true)
  };

  const handleRandomDivide = () => {
    // Implement the logic to randomly divide people into groups
    // You can use an algorithm to shuffle the users and then distribute them into the specified number of groups
    // Update the groupDetails state with the new groups

    // For demonstration purposes, let's shuffle the existing users and update the state
    setGroupDetails((prevGroupDetails) => {
      const shuffledUsers = [...prevGroupDetails.users].sort(() => Math.random() - 0.5);
      const dividedGroups = [];
      const usersPerGroup = Math.ceil(shuffledUsers.length / numberOfGroups);

      for (let i = 0; i < numberOfGroups; i++) {
        const startIdx = i * usersPerGroup;
        const endIdx = startIdx + usersPerGroup;
        dividedGroups.push(shuffledUsers.slice(startIdx, endIdx));
      }

      return {
        ...prevGroupDetails,
        dividedGroups,
      };
    });
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

  // Check if the user is a member of the group
  const isMember = groupDetails.users.some(user => user.id == userInfo.id);

  if (!isMember) {
    // Redirect user to home page or an error page if not a member of the group
    navigate('/home');
    return null;
  }

  const handleExitGroup = (userId) => {
    // const shouldExit = window.confirm("Are you sure you want to exit the group?");
    
    // if (!shouldExit) {
    //   return; // User canceled the exit
    // }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setGroupDetails((prevGroupDetails) => {
          const updatedUsers = prevGroupDetails.users.map((user) => {
            if (user.id == userId) {
              return { ...user, isExiting: true };
            }
            return user;
          });
          return {
            ...prevGroupDetails,
            users: updatedUsers,
          };
        });
      
        // Implement the logic to remove the user from the group
        axiosInstance
          .delete(`/api/group/${groupDetails.id}/removeUser/${userId}`, userInfo.id)
          .then((res) => {
            navigate('/home')
            // Update the UI or perform any necessary actions upon successful exit
            console.log(`User ${userId} exited the group successfully`);
      
            // Filter out the exited user from the state
            setGroupDetails((prevGroupDetails) => {
              const updatedUsers = prevGroupDetails.users.filter((user) => user.id != userId);
              return {
                ...prevGroupDetails,
                users: updatedUsers,
              };
            });
            Swal.fire({
              title: "Exited group successfully!",
              confirmButtonText: 'Ok',
              icon: "success"
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Something went wrong!",
              confirmButtonText: 'Ok',
              icon: "error"
            });
            console.error(`Error exiting group for user ${userId}:`, error);
          });
      }
    });
    
  };

  const renderPersonCards = () => {
    if (groupDetails.dividedGroups) {
      return groupDetails.dividedGroups.map((group, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Group {index + 1}</h2>
          {group.map((user) => (
            <div key={user.id} className="border rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 group relative">
              <h2 className="text-lg font-semibold">
                {user.full_name} {userInfo.id == user.id ? "(Me)" : ""}
              </h2>
              <p className="text-sm text-gray-500 opacity-100 transition-opacity">
                {user.email}
              </p>
              {userInfo.id == groupDetails.admin_id && userInfo.id != user.id && (
                <button
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDeleteUser(user.id)}
                  disabled={user.isDeleting}
                >
                  {user.isDeleting ? "Deleting..." : "Delete"}
                </button>
              )}
              {userInfo.id != groupDetails.admin_id && userInfo.id == user.id && (
                <button
                  className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleExitGroup(user.id)}
                  disabled={user.isExiting}
                >
                  {user.isExiting ? "Exiting..." : "Exit Group"}
                </button>
              )}
              {/* Other user actions/buttons */}
            </div>
          ))}
        </div>
      ));
    } else {
      // If dividedGroups is not available, render the default view
      return groupDetails.users.map((user) => (
        <div key={user.id} className="border rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 group relative">
          <h2 className="text-lg font-semibold">
            {user.full_name} {userInfo.id == user.id ? "(Me)" : ""}
          </h2>
          <p className="text-sm text-gray-500 opacity-100 transition-opacity">
            {user.email}
          </p>
          {userInfo.id == groupDetails.admin_id && userInfo.id != user.id && (
            <button
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleDeleteUser(user.id)}
              disabled={user.isDeleting}
            >
              {user.isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
          {userInfo.id != groupDetails.admin_id && userInfo.id == user.id && (
            <button
              className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleExitGroup(user.id)}
              disabled={user.isExiting}
            >
              {user.isExiting ? "Exiting..." : "Exit Group"}
            </button>
          )}
          {/* Other user actions/buttons */}
        </div>
      ));
    }
  };
  

  const exportToCSV = () => {
    // Check if dividedGroups is available
    if (!groupDetails.dividedGroups || groupDetails.dividedGroups.length == 0) {
      console.error('No groups available to export.');
      return;
    }

    // Prepare CSV content
    const csvContent = groupDetails.dividedGroups.reduce((csv, group, index) => {
      const groupData = group.map(user => `${user.full_name},${user.email}`).join('\n');
      return `${csv}Group ${index + 1}\nFull Name,Email\n${groupData}\n\n`;
    }, '');

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'group_details.csv';
    link.style.display = 'none';

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };
  
  const handleDeleteUser = (userId) => {
    // const shouldDelete = window.confirm("Are you sure you want to delete this user?");
    
    // if (!shouldDelete) {
    //   return; // User canceled the deletion
    // }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, kick this user!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        // Find the user by ID and set the isDeleting state to true
    setGroupDetails((prevGroupDetails) => {
      const updatedUsers = prevGroupDetails.users.map((user) => {
        if (user.id == userId) {
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
          const updatedUsers = prevGroupDetails.users.filter((user) => user.id != userId);
          return {
            ...prevGroupDetails,
            users: updatedUsers,
          };
        });
        Swal.fire({
          title: "Kicked!",
          text: "Your user has been kicked.",
          icon: "success"
        });
      })
      .catch((error) => {
        console.error(`Error deleting user ${userId}:`, error);
      });
      }
    });

    
  };
  
  

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{groupDetails.group_name}</h1>
        <p className="text-gray-600 mb-4">{groupDetails.group_description}</p>

        {/* Display groupId and provide a button to copy it to clipboard */}
        <div className="mb-4 flex items-center justify-center">
          <label className="text-gray-700 text-sm font-bold mr-2">
            Group ID
          </label>
          <div className="flex items-center">
            <input
              ref={groupIdRef}
              type="text"
              value={groupId}
              className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

        <div className="mb-4 flex items-center justify-center">
          <label className="text-gray-700 text-sm font-bold mr-2">
            Number of Groups
          </label>
          <input
            type="number"
            value={numberOfGroups}
            onChange={(e) => setNumberOfGroups(parseInt(e.target.value, 10))}
            className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1"
          />
        </div>

        <button
          className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleRandomDivide}
        >
          Randomly Divide Groups
        </button>
        <button
          className="mb-4 mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={exportToCSV}
        >
          Export to CSV
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderPersonCards()}
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default Group;
