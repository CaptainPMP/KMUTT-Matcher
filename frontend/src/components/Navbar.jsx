import { useContext } from "react";
import { axiosInstance } from "../../lib/axios";
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from "../App";

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const { setUserInfo } = useContext(DataContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    axiosInstance
      .get('/api/logout')
      .then((res) => {
        setUserInfo({
          id: '',
          full_name: '',
          email: '',
          isLogin: false,
          });
          localStorage.clear('userInfo')
        navigate('/login');
      })
      .catch((err) => {
        console.log('logout error is:', err);
      });
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/' className="text-xl font-bold">KMUTT Matcher</Link>
        {!userInfo?.isLogin ? (
          <div className="space-x-4">
            <Link to='/login' className="hover:bg-gray-600 px-3 py-2 rounded">Login</Link>
            <Link to='/register' className="hover:bg-gray-600 px-3 py-2 rounded">Register</Link>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to='/home' className="hover:bg-gray-600 px-3 py-2 rounded">Home</Link>
            <Link to='/editProfile' className="hover:bg-gray-600 px-3 py-2 rounded">Edit Profile</Link>
            <Link to='/editContact' className="hover:bg-gray-600 px-3 py-2 rounded">Edit Contact</Link>
            <Link to="/" className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleLogout}>Logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
