import React , {useEffect} from "react";
import logoWhite from "./.././../assets/logo_white.png";
import "../Layout/Layout.scss";
import "./Profile.scss";
import aagaz from "./.././../assets/aagaz.png";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../../context/AuthContext';
function Profile() {
  const navigate = useNavigate();
  const auth = useAuth();
   
  useEffect(() => {
    console.log(auth);
  }, )
  

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
        <div className="profile-sidebar">
          <img src={logoWhite} />
        </div>
        <div className="profile-content-area">
          <p className="back-btn" onClick={() => navigate("/dashboard")}>
            <i class="fa fa-angle-left fa-2x"></i>Dashboard
          </p>
          <div className="text">
            <div className="name">
              <h1>Ishan Kumar</h1>
              <p>ishan.kumar1@learner.manipal.edu</p>
              <span>EMAIL VERIFIED</span>
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
            {/* <div>
              <p>Upload Documents</p>
              <div className="drivelink">
                <label>
                  Aadhar Card
                  <input type="file" />
                </label>
                <label>
                  College ID
                  <input type="file" />
                </label>
                <label>
                  Bonafide
                  <input type="file" />
                </label>
              </div>
            </div> */}
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
