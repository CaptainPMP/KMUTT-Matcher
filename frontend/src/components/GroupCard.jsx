import React from 'react';
import { Link } from 'react-router-dom';

const GroupCard = ({ group, isAdmin, onDeleteClick }) => (
  <Link to={`/group/${group.id}`} className="w-full md:w-1/3 p-4">
    <div className="bg-white p-4 rounded-md shadow-md mb-4 cursor-pointer hover:bg-gray-100">
      <h3 className="text-xl font-bold mb-2">{group.group_name}</h3>
      <p className="text-gray-600">{group.group_description}</p>
      {isAdmin && (
        <button
          onClick={() => onDeleteClick(group.id)}
          className="bg-red-500 text-white px-3 py-1 mt-2 rounded-md"
        >
          Delete
        </button>
      )}
    </div>
  </Link>
);

export default GroupCard;
