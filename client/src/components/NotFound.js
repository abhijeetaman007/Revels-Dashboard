import React from 'react';
import Lottie from 'lottie-react';

import notfoundAnimation from '../assets/404.json';

const NotFound = () => {
  return (
    <div className="lottie-anim">
      <Lottie animationData={notfoundAnimation} />
      <div className="anim-font font-medium">PAGE NOT FOUND</div>
    </div>
  );
};

export default NotFound;
