import React, { useState, useEffect } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import ProfilePage from "../Profile";
import logo from '../assets/Images/logo.png';

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

 
  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn"); 
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignout = () => {
    
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <a href="/"> <img className="logo" src={logo} alt="logo" width={100} /></a>
       

        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
    
           <a href="/">Home</a>
          
   
            <a href="/post">Submit Stray</a>
            <a href="/viewStrays">View Strays</a>
            <a href="/donate">Donate</a>

           
            {isLoggedIn ? (
              <button className="button" onClick={handleSignout}>
                Signout
              </button>
            ) : (
              <button className="button">
                <a href="/login" class="text-black">Sign in</a>

              </button>
            )}
  <div >
  <ProfilePage />
  </div>
          
          </div>
        </OutsideClickHandler>
      
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;

