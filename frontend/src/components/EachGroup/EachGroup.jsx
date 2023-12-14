import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { axiosInstance } from '../../../lib/axios';

const EachGroup = () => {
  const location = useLocation();
  const email = location.state.id;
  const password = location.state.pass;
  const group = location.state.groupName;
  const [rooms, setRooms] = useState([]);
  const [randomizedGroups, setRandomizedGroups] = useState([]);
  const [groupMemberNames, setGroupMemberNames] = useState([]);
  const [groupNumber, setGroupNumber] = useState(1);
  const [numMembers, setNumMembers] = useState();
  const [clickedButton, setClickedButton] = useState(null);
  const [randomizedMembers, setRandomizedMembers] = useState([]);
  const history = useNavigate();

  const Goback = async (e) => {
    history("/main", { state: { id: email, pass: password } });
  }

  const handleRoomClick = async (groupName) => {
    try {
      console.log('Clicked room:', groupName);
      const response = await axiosInstance.get('/users/groupMembers/' + groupName);

      console.log('Response data:', response.data);

      if (response.data && Array.isArray(response.data.group_membersName)) {
        const memberNames = response.data.group_membersName.map((groupMemberName) => (
          <div key={groupMemberName} className='MemberName2 bg-red-100 rounded-3xl flex flex-row justify-center items-center mx-auto'>
            <h1 className='Text2 Rainbow font-bold '>{groupMemberName}</h1>
          </div>
        ));

        setGroupMemberNames(memberNames);
        history('/group/' + groupName, { state: { id: email, pass: password, groupName: groupName } });
        window.location.reload();
      } else {
        console.error('Invalid response format for group members:', response.data);
      }
    } catch (error) {
      console.error('Error fetching group members:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/users/groupsByGmail/' + email);
        setRooms(
          response.data.map((group) => (
            <button key={group.group_name} className='Group bg-red-100 rounded-3xl my-4' onClick={() => handleRoomClick(group.group_name)}>
              <div className='my-2'>
                <h1 className='Text2 Rainbow font-bold '>
                  {group.group_name.length > 10 ? `${group.group_name.substring(0, 10)}...` : group.group_name}
                </h1>
              </div>
            </button>
          ))
        );
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchData();
  }, [email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response3 = await axiosInstance.get('/users/groupMembers/' + group);

        if (response3.data && Array.isArray(response3.data.group_membersName)) {
          const memberNames = response3.data.group_membersName.map((groupMemberName) => (
            <div key={groupMemberName} className='MemberName2 bg-red-100 rounded-3xl flex flex-row justify-center items-center mx-auto'>
              <h1 className='Text2 Rainbow font-bold '>{groupMemberName}</h1>
            </div>
          ));
          setGroupMemberNames(memberNames);
        } else {
          console.error('Invalid response format for group members:', response3.data);
        }
      } catch (error) {
        console.error('Error fetching group members:', error);
      }
    };

    fetchData();
  }, [group]);

  const handleButtonClick = (buttonName) => {
    setClickedButton(buttonName);

    if (buttonName === 'Random') {
      const shuffledMembers = shuffleArray(groupMemberNames.map((member) => member.key));
      setRandomizedMembers(shuffledMembers);
    }
  };

  const handleButtonClick2 = async () => {
    if (!randomizedMembers.length) {
      console.error('Please click the "Random" button first.');
      return;
    }
    try {
      const groups = [];
      for (let i = 0; i < randomizedMembers.length; i += numMembers) {
        const selectedMembers = randomizedMembers.slice(i, i + numMembers);
        groups.push(
          <div key={i} className='ShowEachGroups bg-blue-00 flex flex-col text-3xl font-semibold pt-5 '>
            <div className='ShowGroupNum text-5xl text-center pb-5'>Group Number {groupNumber + i / numMembers}</div>
            <div className=' flex flex-col justify-center items-center'>
              {selectedMembers.map((groupMemberName, index) => (
                <button key={index} className='MemberName2 bg-red-100 rounded-3xl my-4'>
                  <div className=''>
                    <h1 className='Text2 Rainbow font-bold'>{groupMemberName}</h1>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      }

      setRandomizedGroups(groups);
      setGroupNumber(1);
      setRandomizedMembers([]);
      setClickedButton(null);
    } catch (error) {
      console.error('Error grouping members:', error);
    }
  };

  const exportCSV = () => {
    const csvData = [];
  
    randomizedGroups.forEach((group, index) => {
      const groupNumber = index + 1;
      const memberNames = group.props.children[1].props.children.map(
        (groupMemberName) => groupMemberName.props.children.props.children.props.children
      );
  
      csvData.push([groupNumber, ...memberNames]);
    });
  
    const csvContent = 'Group Number,Member Name\n' + csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  
    saveAs(blob, 'group_data.csv');
  };

  const handleNumMembersChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumMembers(isNaN(value) ? 1 : value);
  };

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div className='flex flex-row'>
      <div className='Show h-screen flex flex-col bg-zinc-950/60 pt-4 overflow-auto'>
        <button onClick={Goback} className='flex flex-row item-center justify-center'>
          <img src="https://cdn.discordapp.com/attachments/463329836174409730/1174800497450958858/1-removebg-preview.png?ex=6568e939&is=65567439&hm=7a0ce765ba85734bdd406da7764c04657430dc4b9170e26e316ddec66bfb6b2b&" class="w-20" alt="Flowbite Logo " />
          <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">KMUTT</span>
        </button>
        <div className='ShowGroups flex flex-col bg-green-00 mt-10 justify-center items-center'>
          {rooms}
        </div>
      </div>
      <div className='RandomSide overflow-auto'>
        <div className='RandomSet flex flex-row bg-zinc-950/60 mx-auto mt-5 rounded-3xl'>
          <div className='RandomText bg-red-00 flex flex-row gap-4 justify-center items-center text-3xl font-semibold'>
            <button
              className={`RandomChoice bg-gray-300 h-20 border-solid rounded-2xl border-4 ${clickedButton === 'Similarity' ? 'border-blue-500' : 'border-purple-500'
                }`}
              onClick={() => handleButtonClick('Similarity')}
            >
              Similarity
            </button>
            <button
              className={`RandomChoice bg-gray-300 h-20 border-solid rounded-2xl border-4 ${clickedButton === 'Difference' ? 'border-blue-500' : 'border-purple-500'
                }`}
              onClick={() => handleButtonClick('Difference')}
            >
              Difference
            </button>
            <button
              className={`RandomChoice bg-gray-300 h-20 border-solid rounded-2xl border-4 ${clickedButton === 'Random' ? 'border-blue-500' : 'border-purple-500'
                }`}
              onClick={() => handleButtonClick('Random')}
            >
              Random
            </button>
          </div>
          <div className='bg-red-000 RandomChoice flex flex-row justify-center items-center text-3xl font-semibold '>
            <input
              className='TestInput text-center'
              type='number'
              value={numMembers}
              onChange={handleNumMembersChange}
            />
          </div>
          <div className='RandomText bg-red-00 flex flex-col gap-4 justify-center items-center text-3xl font-semibold'>
            <button onClick={exportCSV} className='Export bg-red-700 h-20 border-solid rounded-2xl border-4'>
              Export
            </button>
            <button onClick={handleButtonClick2} className='Summit bg-green-700 h-20 border-solid rounded-2xl border-4'>
              Summit
            </button>
          </div>
        </div>
        <div className='ShowAllMem  place-items-stretch gap-6 grid grid-flow-row bg-red-00 mx-auto mt-9'>
          {randomizedGroups.length > 0 ? randomizedGroups : groupMemberNames}
        </div>
      </div>
    </div>
  );
};

export default EachGroup;
