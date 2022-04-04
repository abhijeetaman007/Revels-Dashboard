import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import failedAnimation from "../../assets/failed.json";
const FailedAnimation = () => {
  return (
    <div className="lottie-anim">
      <Lottie animationData={failedAnimation} />
      <div className="ver-div">
        <div className="anim-font font-medium">Transaction Failed</div>
        <Link to="/dashboard/delegatecard">
          <button className="lottie-button font-medium">Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default FailedAnimation;
