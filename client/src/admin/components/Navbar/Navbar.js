import React from 'react';
import revels from './../../../assets/logos/logo_landing.png';

const Navbar = () => {
  return (
    <div className="d-flex flex-row align-items-center">
      <img src={revels} height={100} className="mx-2 my-1" />
      <div className="font-light text-light" style={{ fontSize: '1.5rem' }}>
        REVELS '22
      </div>
    </div>
  );
};

export default Navbar;
