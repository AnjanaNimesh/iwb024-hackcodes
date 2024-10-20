
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../Home/Hero';
import Value from '../Home/Value';
import Help from '../Home/Help';
import GetStarted from '../Home/GetStarted';

const HomePage = () => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.name) {
      setUserName(userData.name);
    } else {
      setError('User not logged in.');
    }
  }, []);

  const handleSignOut = () => {
    // Remove user data from localStorage and reset state
    localStorage.removeItem('userData');
    setUserName('');
    setError('');
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <>
    <Hero/>
    <Value/>
    <Help/>
    <GetStarted/>
        {/* <div>
      {error ? <p>{error}</p> : <h1>Welcome, {userName}!</h1>}
      
      
      {userName && (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <button onClick={handleProfileClick}>Profile</button> 
        </>
      )}
    </div> */}
    </>

    

  );
};

export default HomePage;
