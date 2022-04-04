import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import successAnimation from "../../assets/confirm.json";
const SuccessAnimation = () => {
  return (
    <div className="lottie-anim">
      <Lottie animationData={successAnimation} />
      <div className="ver-div">
        <div className="anim-font font-medium">Transaction Successfull</div>
        <Link to="/dashboard/delegatecard">
          <button className="lottie-button font-medium">Go Back</button>
        </Link>
      </div>
    </div>
  );
};
export default SuccessAnimation;
