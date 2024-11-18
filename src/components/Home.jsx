import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you're importing from 'react-router-dom'
import { Cookies } from 'react-cookie';

function Home() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userToken = cookies.get('Token'); // Get the token from cookies

  // Redirect if the user is already logged in
  useEffect(() => {
    if (userToken) {
      navigate('/dashboard'); // Redirect to dashboard if the token exists
    }
  }, [userToken, navigate]); // Only run this effect when userToken or navigate changes

  return (
    <div className='flex justify-center items-center gap-2 p-4'>
      <button
        className='p-2 bg-black text-white rounded'
        onClick={() => navigate('/login')}
      >
        Login
      </button>
      <button
        className='p-2 bg-black text-white rounded'
        onClick={() => navigate('/signup')}
      >
        Signup
      </button>
    </div>
  );
}

export default Home;
