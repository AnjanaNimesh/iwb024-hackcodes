import React from "react";
import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import HeroImg from "../assets/Images/Hero.png";
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side  */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="paw">
              <img src="./paw.png" alt="" />
            </div>
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, type: "spring" }}
            >
              Find Your New <br />
              Best Buddy!
            </motion.h1>
            {/* <h1>
              Find Your New <br /> Best Buddy!
            </h1> */}
          </div>
          <div className="flexColStart hero-des">
            <span className="secondaryText">
              Connect with adorable strays waiting for your love and care.
            </span>
            <span className="secondaryText">
              Together, we can help strays find their forever homes.
            </span>
          </div>
          <button className="flexCenter button">
            <a href="/signup">Join Us Free</a>
          </button>
        </div>
        {/* right side */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "spring" }}
            className="image-container"
          >
            <img src={HeroImg} alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
