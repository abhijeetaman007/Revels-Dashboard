import React from "react";
import "./Landing.scss"
import "./Navbar.css";

import tree from "./../../assets/backgrounds/tree.png"; 
import two from "./../../assets/backgrounds/two.png";
import sun from "./../../assets/backgrounds/sun.png";
import birds from "./../../assets/backgrounds/birds.png";
import three from "./../../assets/backgrounds/three.png";
import topCloud from "./../../assets/backgrounds/topCloud.svg";
import bottomCloud from "./../../assets/backgrounds/bottomCloud.svg";
import four from "./../../assets/backgrounds/four.svg";
import logo from "./../../assets/logo_landing.png";
import { useAuth } from "../../context/AuthContext";
import aagaz from "./../../assets/aagaz.png"

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
  const auth = useAuth();
  return (
    <div className="landing-wrapper">
      <div className="content-wrapper">
        <nav className="navbar">
          <div className="nav-logo">
            <img src={logo}></img>
          </div>
          <ul className="nav-menu">
              {auth.user && <li className="nav-item" onClick={closeNav}>
                  <a href="/dashboard" className="nav-link">Dashboard</a>
              </li>}
              <li className="nav-item" onClick={closeNav}>
                  <a href="/" className="nav-link">Events</a>
              </li>
              <li className="nav-item" onClick={closeNav}>
                  <a href="/" className="nav-link">Tshirts</a>
              </li>
              <li className="nav-item" onClick={closeNav}>
                  <a href="/" className="nav-link">Schedule</a>
              </li>
              <li className="nav-item" onClick={closeNav}>
                  {
                    auth.user 
                    ?
                    <a onClick={auth.userLogout} className="nav-link">Logout</a>
                    :
                    <a href="/login" className="nav-link">Login</a>
                  }
              </li>
          </ul>
          <div className="hamburger" onClick={mobileNav}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
          </div>
        </nav>
        <div className="font-antiga landing-title">
          <h5>CELEBRATING 40 YEARS</h5>
          <img src={aagaz} alt="Aagaz 2022"></img>
          <h5>BEYOND LEGACIES</h5>
        </div>
      </div>
      <div className="svg-wrapper">
        <img src={three} alt="Layer Three"></img>
        <img src={two} alt="Layer Two"></img>
        <img src={tree} alt="Trees layer"></img>
        <img src={sun} alt="This is the sun"></img>
        <img src={birds} alt="These are the birds"></img>
        <img src={topCloud} alt="These are the clouds"></img>
        <img src={four} alt="This is layer four"></img>
        <img src={bottomCloud} alt="Cloud"></img>
      </div>
    </div>
  );
}

export default Landing;