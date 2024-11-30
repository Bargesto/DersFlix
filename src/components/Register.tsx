import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const success = register(formData.username, formData.password);
    if (success) {
      navigate('/');
    } else {
      setError('Username already exists');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Register for DERSFLIX</h2>
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            required
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full bg-gray-800 rounded-md px-4 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-gray-800 rounded-md px-4 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full bg-gray-800 rounded-md px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="text-red-600 hover:text-red-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;