import React from "react";
import Lottie from "lottie-react";

import notfoundAnimation from "../assets/404.json";

import notfound2Animation from "../assets/404_1.json";

import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="lottie-anim">
      <div className="lottieContainer">
        <Lottie
          style={{ height: "40vh" }}
          animationData={notfoundAnimation}
          loop
        />
        <Lottie
          style={{ height: "40vh", marginLeft: "-5em" }}
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
          marginTop: "-2em",
        }}
        className="anim-font back_"
      >
        Go Back to Revelry
      </div>
    </div>
  );
};

export default NotFound;
