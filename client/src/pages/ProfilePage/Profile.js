import React from "react";
import logoWhite from "./.././../assets/logo_white.png";
import "../Layout/Layout.scss";
import "./Profile.scss";
import aagaz from "./.././../assets/aagaz.png";

function Profile() {
  return (
    <div className="layout-wrapper">
      <nav className="navbar">
        <div className="brand">
          <img alt="Revels Logo" src={logoWhite}></img>
          <div>
            <h4 className="font-medium">REVELS '22</h4>
            <p className="font-light">Welcome back John Doe</p>
          </div>
        </div>
        <i className="fa fa-bell "></i>
      </nav>
      <div className="dash-wrapper">
        <div className="sidebar">
          <img src={logoWhite} />
        </div>
        <div className="content-area">
        <p className="back-btn">
            <i class="fa fa-angle-left fa-2x"></i> Back to Dashboard
          </p>
          <div className="text">
            <div className="name">
              <h1>Ishan Kumar</h1>
              <p>
                ishan.kumar1@learner.manipal.edu <span>EMAIL VERIFIED</span>
              </p>
            </div>
            <div className="grid">
              <div>
                <h1>College ID</h1>
                <p>190911116</p>
              </div>
              <div>
                <h1>Phone</h1>
                <p>9430470186</p>
              </div>
              <div>
                <h1>College</h1>
                <p>MIT, Manipal</p>
              </div>
            </div>
            <div>
              <p>Drive link for College ID</p>
              <div className="drivelink">
                <input />
                <button>Submit</button>
              </div>
            </div>
            <div className="delegate-card">
              <p>
                Delegate ID <br />
                <span>159mitr1e</span>
              </p>
              <img src="https://media.geeksforgeeks.org/wp-content/uploads/20200716125639/gfg422.jpg" />
            </div>
          </div>
          <div className="aagaz">
            <img src={aagaz} />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Profile;
