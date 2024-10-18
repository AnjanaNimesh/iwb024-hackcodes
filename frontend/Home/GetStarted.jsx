import React from "react";
import "./GetStarted.css";

const GetStarted = () => {
  return (
    <section className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Join Our Community</span>
          <span className="secondaryText">
            Become part of StrayCare and connect with compassionate individuals
            dedicated to improving the lives of stray animals.
            <br /> Together, we can make a lasting impact.
          </span>
          <button className="button">
            <a href="/post">Add a Pet</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
