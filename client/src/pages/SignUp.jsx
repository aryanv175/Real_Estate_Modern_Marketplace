import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='p-6 bg-white rounded-md shadow-md max-w-md w-full'>
        <h1 className='text-3xl text-center font-semibold mb-6'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Username'
            className='border p-3 rounded-lg focus:outline-none focus:border-blue-500'
            id='username'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            className='border p-3 rounded-lg focus:outline-none focus:border-blue-500'
            id='email'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            className='border p-3 rounded-lg focus:outline-none focus:border-blue-500'
            id='password'
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:bg-blue-700 disabled:opacity-80 cursor-pointer'
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
        <div className='flex items-center justify-center mt-5'>
          <p>Have an account?</p>
          <Link to={'/sign-in'} className='text-blue-700 ml-2'>
            Sign in
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
  );
}
