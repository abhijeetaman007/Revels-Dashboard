import React from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import verifiedAnimation from '../assets/verified.json';

import ArrowVector from './../assets/right-arrow.png';
const VerifyAnimation = () => {
  return (
    <div className="lottie-anim">
      <Lottie animationData={verifiedAnimation} />
      <div className="anim-font font-medium">EMAIL VERIFIED</div>
      <Link to="/login">
        <button>
          SIGN IN
          <img
            style={{ height: '20px', marginLeft: '5px', marginTop: '3px' }}
            src={ArrowVector}
          ></img>
        </button>
      </Link>
    </div>
  );
};

export default VerifyAnimation;
