import React from "react";
import "./Footer.css";
import logo from '../assets/Images/logo.png'
import { div } from "framer-motion/client";
const Footer = () => {
  return (
    <div className="footmain">
 <section className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
  
  
        <div className="flexColStart f-left">
          <img src={logo} alt="" width={120} />
          <span className="secondaryClass">
            The place where compassion meets <br />
            action for every stray in need.
          </span>
        </div>
        <div className="flexColStart f-right">
          <span className="primaryText">Visit Our Shelter</span>
          <span className="secondaryText">
            No.01,
            <br /> Silkhouse Street, <br /> Kandy
          </span>
          <div className="flexCenter f-menu">
          <a href="/">Home</a>
          <a href="/post">Submit Stray</a>
          <a href="/viewStrays">View Strays</a>
          <a href="/donate">Donate</a>
          </div>
        </div>
      </div>
    </section>
    </div>
   
  );
};

export default Footer;
