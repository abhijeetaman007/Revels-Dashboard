import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import revels from './../../../assets/logos/logo_landing.png';

const Navbar = () => {
  const auth = useAuth();
  return (
    <div className="d-flex flex-row align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <img src={revels} height={100} className="mx-2 my-1" />
        <div className="font-light text-light" style={{ fontSize: '1.5rem' }}>
          REVELS '22
        </div>
      </div>
      <button
        type="button"
        className="btn m-2 font-medium"
        style={{ 
          border: '2px solid #F4737E', 
          color: "#F4737E", 
          minWidth: "5%" 
        }}
        onClick={auth.adminLogout}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Navbar;
