import React, { useContext } from 'react'
import { DataContext } from '../App'
import { axiosInstance } from '../../lib/axios'
import { Link } from 'react-router-dom'

const Footer = () => {
    const {userInfo, setUserInfo } = useContext(DataContext)

    const handleCreateGroup = () => {
        axiosInstance.post('/api/createGroup')
    }
    const handleJoinGroup = () => {}
    
  return (
    <div>
        <div className="fixed bottom-0 left-0 right-0 bg-gray-200 p-4 flex justify-center">
            <Link to='/createGroup' className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded mx-2">
            Create Group
            </Link>
            <Link to='/joinGroup' className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 rounded mx-2">
            Join Group
            </Link>
        </div>
    </div>
  )
}

export default Footer