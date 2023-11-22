import React from 'react'

function Navbar() {
  return (
    <nav className='p-4'>
        <div className="container mx-auto flex justify-between items-center mt-3">
            <a href='#' className='text-white text-2xl font-semibold'>KMUTT</a>
            <ul className='flex space-x-4'>
                <li><a href='#' className='text-white text-1xl bg-blue-500 px-8 py-3 rounded-full'>Login</a></li>
                <li><a href='#' className='text-white text-1xl bg-blue-500 px-5 py-3 rounded-full' >Register</a></li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar