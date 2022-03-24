import React from "react";
import logo from "./../../assets/logos/logo_landing.png"
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const auth = useAuth();
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
        <nav className="navbar">
          <div className="nav-logo">
            <img src={logo} alt="Revels Logo"></img>
          </div>
          <ul className="nav-menu">
              {auth.user && <li className="nav-item" onClick={closeNav}>
                  <a href="/dashboard" className="nav-link">Dashboard</a>
              </li>}
              <li className="nav-item" onClick={closeNav}>
                  <a href="/events" className="nav-link">Events</a>
              </li>
              <li className="nav-item" onClick={closeNav}>
                  <a href="/tshirts" className="nav-link">Tshirts</a>
              </li>
              <li className="nav-item" onClick={closeNav}>
                  <a href="/schedule" className="nav-link">Schedule</a>
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
    );
}

export default Navbar;