import { Link } from "react-router-dom";

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

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
            <Link to='/edit-profile' className="hover:bg-gray-600 px-3 py-2 rounded">Edit Profile</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
