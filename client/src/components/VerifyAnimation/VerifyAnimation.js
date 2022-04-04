import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import verifiedAnimation from "../../assets/verified.json";

const VerifyAnimation = () => {
  return (
    <div className="lottie-anim">
      <Lottie animationData={verifiedAnimation} />
      <div className="ver-div">
        <div className="anim-font font-medium">EMAIL VERIFIED</div>
        <Link to="/login">
          <button className="lottie-button font-medium">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default VerifyAnimation;
