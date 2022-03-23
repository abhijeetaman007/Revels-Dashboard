import React from "react";
import Lottie from "lottie-react";

import notfoundAnimation from "../assets/404.json";

import notfound2Animation from "../assets/404_1.json";

const NotFound = () => {
  return (
    <div className="lottie-anim">
      <div className="lottieContainer">
        <Lottie
          style={{ height: "40vh" }}
          animationData={notfoundAnimation}
          loop
        />
        <Lottie
          style={{ height: "40vh", marginLeft: "-80px" }}
          animationData={notfound2Animation}
          loop
        />
      </div>
      <div
        style={{
          fontSize: "2em",
          fontWeight: "800",
          opacity: "0.6",
        }}
        className="anim-font"
      >
        Go Back to Revelry
      </div>
    </div>
  );
};

export default NotFound;
