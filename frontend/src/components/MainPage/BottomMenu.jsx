import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate,useLocation } from "react-router-dom"

function BottomMenu() {
    const location=useLocation()
    const email = location.state.id
    const password = location.state.pass
    const history=useNavigate();

    const handleSubmitCreateGroup = async (e) => {
        history("/create_room",{state:{id:email,pass:password}})
    }
    return (

        <div
            className="MenuBottom fixed flex flex-row justify-center bg-blue-400"
            style={{
                bottom: 0,
                width: '100%',
            }}
        >
            <button className="w-1/3 text-3xl text-green bg-white hover:bg-gray-400 text-green-500 font-bold " >
                Join Group
            </button>
            <button className="w-1/3 text-3xl bg-green-500 hover:bg-green-700 text-black font-bold px-4" onClick={handleSubmitCreateGroup}>
                Create Group
            </button>
            <button className="w-1/3 text-3xl bg-white hover:bg-gray-400 text-orange-400 font-bold px-4">
                Find Your Friends
            </button>
        </div>
    );
}

export default BottomMenu;
