import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import logoBlack from "./../../assets/logos/logo_black.png";
import './Auth.css';

import SignIn from '../../components/SignIn/SignIn';
import Register from '../../components/Register/Register';
import ForgotPassword from '../../components/ForgotPassword';

const AuthPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);

  useEffect(() => {
    if (!auth.loading) {
      if (auth.user) {
        navigate('/dashboard/profile');
      }
    }
  }, [auth.loading]);

  return (
    <div className="auth-wrapper">
      <div className="row">
        <div className="col-md-8 p-0 col-12 hello-area d-flex flex-column justify-content-center align-items-center">
            <div className="hello-box">
              <img src={logoBlack} style={{ height: "100%" }}></img>
            </div>
            <h4 className="auth-revelry font-medium">LET THE REVELRY BEGIN</h4>
        </div>
        <div className="col-md-4 col-12 login-area d-flex flex-col justify-content-center align-items-md-center">
          {login && (
            <SignIn
              setLogin={setLogin}
              setRegister={setRegister}
              setForgotPass={setForgotPass}
            />
          )}
          {register && (
            <Register
              setLogin={setLogin}
              setRegister={setRegister}
              setForgotPass={setForgotPass}
            />
          )}
          {forgotPass && (
            <ForgotPassword
              setLogin={setLogin}
              setRegister={setRegister}
              setForgotPass={setForgotPass}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
