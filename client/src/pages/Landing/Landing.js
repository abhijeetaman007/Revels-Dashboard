import React from "react";
import "./Landing.scss"
import "./Navbar.css";

import tree from "./../../assets/backgrounds/tree.png"; 
import two from "./../../assets/backgrounds/two.png";
import sun from "./../../assets/backgrounds/sun.png";
import birds from "./../../assets/backgrounds/birds.png";
import three from "./../../assets/backgrounds/three.png";
import clouds_top from "./../../assets/backgrounds/clouds.png";
import four from "./../../assets/backgrounds/four.svg";
import logo from "./../../assets/logo_landing.png";

const Landing  = () => {
  // handles hamburger click on mobiles
  const mobileNav = () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
  const closeNav = () => {
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".nav-menu");
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
  }
  return (
    <div className="landing-wrapper">
      <div className="content-wrapper">
        <nav class="navbar">
          <div class="nav-logo">
            <img src={logo}></img>
          </div>
          <ul class="nav-menu">
              <li class="nav-item" onClick={closeNav}>
                  <a href="/login" class="nav-link">Login</a>
              </li>
              <li class="nav-item" onClick={closeNav}>
                  <a href="/" class="nav-link">Events</a>
              </li>
              <li class="nav-item" onClick={closeNav}>
                  <a href="/" class="nav-link">Tshirts</a>
              </li>
              <li class="nav-item" onClick={closeNav}>
                  <a href="/" class="nav-link">Schedule</a>
              </li>
          </ul>
          <div class="hamburger" onClick={mobileNav}>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
          </div>
        </nav>
        <div className="font-antiga landing-title">
          <h5>CELEBRATING 40 YEARS OF REVELRY</h5>
          <h1 className="title fast-flicker">AAGAZ</h1>
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