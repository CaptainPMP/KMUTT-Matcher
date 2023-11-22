import React from 'react'

function BottomMenu() {
    return (
        <div
            className="MenuBottom fixed flex flex-row justify-center bg-blue-400"
            style={{
                bottom: 0,
                width: '100%',
            }}
        >
            <button className="w-1/3 text-3xl text-green bg-white hover:bg-gray-400 text-green-500 font-bold py-2">Join Group</button>
            <button className="w-1/3 text-3xl bg-green-500 hover:bg-green-700  text-black font-bold py-2 px-4" >Create Group</button>
            <button className="w-1/3 text-3xl bg-white hover:bg-gray-400 text-orange-400 font-bold py-2 px-4 d">Find your friends</button>
        </div>
    )
}

export default BottomMenu