import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router';

function ProtectedRoutes({ children  }) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userToken = cookies.get('Token')
  useEffect(() => {
    if (!userToken) {
      navigate('/login'); // Redirect to dashboard if the token exists
    }
  }, [userToken, navigate]);

  // If there is a token, render the passed component
  return children;
}

export default ProtectedRoutes;
