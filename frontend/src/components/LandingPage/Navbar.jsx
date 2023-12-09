import React from 'react'
import { Link } from 'react-router-dom';


// function Navbar() {
//   return (
//     <nav className='p-4 max-w-screen-2xl mx-auto'>
//         <div className=" container mx-auto flex justify-between items-center mt-3">
//             <button to='/' className='text-white text-2xl font-semibold'>KMUTT</button>
//             <ul className='flex space-x-4'>
//                 <li><button to="/login" className='text-white text-1xl bg-blue-500 px-8 py-3 rounded-full'>Login</button></li>
//                 <li><button to="/register" className='Register text-white text-1xl bg-blue-500 px-5 py-3 rounded-full' >Register</button></li>
//             </ul>
//         </div>
//     </nav>
//   )

// }

function Navbar() {
  return (
    <nav className='p-4 max-w-screen-2xl mx-auto'>
        <div className=" container mx-auto flex justify-between items-center mt-3">
            <Link to='/' className='text-white text-2xl font-semibold'>KMUTT</Link>
            <ul className='flex space-x-4'>
                <li><Link to="/login" className='text-white text-1xl bg-blue-500 px-8 py-3 rounded-full'>Login</Link></li>
                <li><Link to="/register" className='Register text-white text-1xl bg-blue-500 px-5 py-3 rounded-full' >Register</Link></li>
            </ul>
        </div>
    </nav>
  )

}

export default Navbar