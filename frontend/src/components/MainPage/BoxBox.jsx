import React, { useState } from 'react';

function BoxBox() {
  const [rooms, setRooms] = useState([]);

  const handleCreateGroup = () => {
    setRooms((prevRooms) => [prevRooms, <div className='EachRoom bg-red-400 rounded-3xl'>e<div></div></div>]);
  };

  return (
    <div className='Room grid grid-flow-row gap-7 space-y-0 mx-auto bg-red-500'>
      {rooms}
      <button className='w-1/3 text-3xl bg-green-500 hover:bg-green-700  text-black font-bold py-2 px-4' onClick={handleCreateGroup}>Create Group</button>
    </div>
  );
}

export default BoxBox;
