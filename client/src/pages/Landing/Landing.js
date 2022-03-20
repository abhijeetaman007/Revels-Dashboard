import React from "react";
import "./Landing.scss"

import tree from "./../../assets/backgrounds/tree.svg"; 
import two from "./../../assets/backgrounds/two.svg";
import sun from "./../../assets/backgrounds/sun.svg";
import birds from "./../../assets/backgrounds/birds.svg";
import three from "./../../assets/backgrounds/three.svg";
import clouds_top from "./../../assets/backgrounds/clouds_top.svg";
import four from "./../../assets/backgrounds/four.svg";
import logo from '../../assets/logo_landing.png';

const Landing  = () => {
  // handles hamburger click on mobiles
  const handleHamburger = () => {
    document.querySelector('.landing-nav-links').classList.toggle('active');
  }
  return (
    <div className="landing-wrapper">
      <div className="content-wrapper">
        <nav className="landing-nav">
          <div className="landing-brand">
            <i className="fa fa-bars" onClick={handleHamburger}></i>
            <div>
              <img src={logo} alt="Revels Logo" width={'100px'}/> 
              <p className="font-antiga">REVELS' 22</p>
            </div>
          </div>
          <div className="landing-nav-links">
            <a href="/" className="font-antiga">Login</a>
            <a href="/" className="font-antiga">Tshirts</a>
            <a href="/" className="font-antiga">Events</a>
            <a href="/" className="font-antiga">Schedule</a>
          </div>
        </nav>
        <div className="font-antiga landing-title">
          <h5>CELEBRATING 40 YEARS OF REVELRY</h5>
          <h1 className="title">AAGAZ</h1>
          <h5>BEYOND LEGACIES</h5>
        </div>
      </div>
      <div className="svg-wrapper">
        <img src={three} alt="Layer Three"></img>
        <img src={two} alt="Layer Two"></img>
        <img src={tree} alt="Trees layer"></img>
        <img src={sun} alt="This is the sun"></img>
        <img src={birds} alt="These are the birds"></img>
        <img src={clouds_top} alt="These are the clouds"></img>
        <img src={four} alt="This is layer four"></img>
      </div>
    </div>
  );
}

export default Landing;