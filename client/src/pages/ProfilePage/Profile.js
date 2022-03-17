import React, { useEffect, useState } from "react";
import logoWhite from "./.././../assets/logo_white.png";
import "../Layout/Layout.scss";
import "./Profile.scss";
import aagaz from "./.././../assets/aagaz.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import QRCode from "react-qr-code";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {
  const navigate = useNavigate();
  const auth = useAuth();

  // useEffect(() => {
  //   console.log(JSON.stringify(auth.user));
  // }, )

  const uploadDocs = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    if(!aadhar){
      toast.error("Aadhar Required", { position: "bottom-center", id: toastId });
      return
    }
    if(!collegeid){
      toast.error("CollegeID Required", { position: "bottom-center", id: toastId });
      return
    }
    if(!accomodation){
      toast.error("Choose Accomodation", { position: "bottom-center", id: toastId });
      return
    }
    
    try {
    } catch (error) {}
  };

  const [aadhar, setaadhar] = useState();
  const [collegeid, setcollegeid] = useState();
  const [accomodation, setaccomodation] = useState();
  const aadharHandler = (event) => {
    setaadhar(event.target.files[0]);
  };
  const collegeidHandler = (event) => {
    setcollegeid(event.target.files[0]);
  };
  return (
    <div className="layout-wrapper">
      <nav className="navbar">
        <div className="brand">
          <img alt="Revels Logo" src={logoWhite}></img>
          <div>
            <h4 className="font-medium">REVELS '22</h4>
            <p className="font-light">Welcome back {auth.user.name}</p>
          </div>
        </div>
        <i className="fa fa-bell "></i>
      </nav>
      <div className="dash-wrapper">
        <div className="profile-sidebar">
          <img src={logoWhite} />
        </div>
        <div className="profile-content-area">
          <p className="back-btn" onClick={() => navigate("/dashboard/events")}>
            <i class="fa fa-angle-left fa-2x"></i>Dashboard
          </p>
          <div className="text">
            <div className="name">
              <h1>{auth.user.name}</h1>
              <p>{auth.user.email}</p>
              <span>User ID: {auth.user.userID}</span>
            </div>
            <div className="grid">
              <div>
                <h1>College ID</h1>
                <p>{auth.user.registrationNumber}</p>
              </div>
              <div>
                <h1>Phone</h1>
                <p>{auth.user.mobileNumber}</p>
              </div>
              <div>
                <h1>College</h1>
                <p>{auth.user.college}</p>
              </div>
            </div>
            {(auth.user.isMahe === 0 && (auth.user.status == "UNVERIFIED" || auth.user.status == "REJECTED")) && (
              <>
                <div>
                  <p>Documents</p>
                  <div className="drivelink">
                    <div className="upload">
                      <label>Aadhar Card</label>
                      <input type="file" onChange={aadharHandler}/>
                    </div>
                    <div className="upload">
                      <label>College ID</label>
                      <input type="file" onChange={collegeidHandler} />
                    </div>
                    <div className="radio-btn">
                      <p>Accommodation?</p>
                      <div onChange={e =>setaccomodation(e.target.value)}>
                        <label for="yes">Yes</label>
                        <input
                          type="radio"
                          id="yes"
                          name="accommodation"
                          value="1"
                        />
                        <label for="no">No</label>
                        <input
                          type="radio"
                          id="no"
                          name="accommodation"
                          value="0"
                        />
                      </div>
                    </div>
                    <button onClick={uploadDocs}>Submit</button>
                  </div>
                </div>
              </>
            )}

            <div className="delegate-card">
              <p>
                Delegate ID <br />
                <span>{auth.user.userID}</span>
              </p>
              <div className="qr">
                <QRCode value={auth.user.token} size={155} />
              </div>
              {/* <img src="https://media.geeksforgeeks.org/wp-content/uploads/20200716125639/gfg422.jpg" /> */}
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
