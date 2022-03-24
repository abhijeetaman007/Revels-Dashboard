import React from "react";
import Lottie from "lottie-react";

import notfoundAnimation from "../assets/404.json";

import notfound2Animation from "../assets/404_1.json";

import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="lottie-anim">
      <div className="lottie-container">
        <Lottie
          animationData={notfoundAnimation}
          loop
        />
        <Lottie
          animationData={notfound2Animation}
          loop
        />
      </div>
      <div
        onClick={() => navigate("/")}
        style={{
          cursor: "pointer",
          fontSize: "2em",
          fontWeight: "1000",
          opacity: "0.8",
        }}
        className="font-heavy back_ text-white"
      >
        Go Back to Revelry
        <i className="fa fa-arrow-right mx-3"></i>
      </div>
    </div>
  );
};

export default NotFound;
