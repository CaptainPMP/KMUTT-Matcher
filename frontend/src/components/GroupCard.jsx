import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const GroupCard = ({ group, isAdmin, onDeleteClick }) => (
  <div className="w-full md:w-1/3 p-4">
    <Link to={`/group/${group.id}`} className="no-underline">
      <div className="bg-white p-4 rounded-md shadow-md mb-4 cursor-pointer hover:bg-gray-100">
        <h3 className="text-xl font-bold mb-2">{group.group_name}</h3>
        <p className="text-gray-600">{group.group_description}</p>
        {isAdmin && (
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent the Link from navigating

              // // Show a confirmation dialog before calling onDeleteClick
              // const isConfirmed = window.confirm('Are you sure you want to delete this group?');
              // if (isConfirmed) {
              //   onDeleteClick(group.id);
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
                  onDeleteClick(group.id);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                }
              });
            }}
            className="bg-red-500 text-white px-3 py-1 mt-2 rounded-md"
          >
            Delete
          </button>
        )}
      </div>
    </Link>
  </div>
);

export default GroupCard;
