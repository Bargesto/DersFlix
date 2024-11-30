import { Link } from 'react-router-dom';
import { Plus, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full bg-black z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-red-600 text-3xl font-bold">
          DERSFLIX
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Welcome, {user.username}</span>
            <Link
              to="/add"
              className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              <Plus size={20} />
              Add Video
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;