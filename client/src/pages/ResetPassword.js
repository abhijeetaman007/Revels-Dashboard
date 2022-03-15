import React, { useEffect, useState } from 'react';
import { useAuth } from "./../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import './AuthPages/Auth.css';
import axios from 'axios';

const ResetPassword = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  useEffect(() => {
    if (!auth.loading) {
      if (auth.user) {
        navigate('/dashboard/profile');
      }
    }
  }, [auth.loading]);

  const validateForm = (toastId) => {        
    if(password === "" || confirmPass === "") {
        toast.error("Please fill all fields", {
            position: "bottom-center",
            id: toastId
        })
    } else if (password !== confirmPass) {
        toast.error("Passwords do not match!")
    }
    return true;
  }

  const handleResetPassword = async (e) => {
      e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
        validateForm(toastId);
        // change API call route
        const res
            = await axios.post(
                "/"
            );
        if(res.success) {
            toast.success("Password reset successfully", { id: toastId });
        } else {
            toast.error("Password reset error", { id: toastId });
        }
      } catch (error) {
        toast.error("Sorry! An error occurred. Please try again later!", {
            position: "bottom-center",
            id: toastId
        });
      }
  }
  return (
    <div className="auth-wrapper">
      <div className="row">
        <div className="col-8 hello-area d-flex justify-content-center align-items-center">
          <div className="hello-box">p</div>
        </div>
        <div className="col-4 login-area d-flex flex-col justify-content-center align-items-center">
            <div className="form-wrapper">
                <h2 className="font-light auth-heading">RESET PASSWORD</h2>
                <form className="auth-form">
                    <div className="user-box">
                      <input
                        type="password"
                        name=""
                        autoComplete="off"
                        required
                        onChange={(e) => setPassword(e.target.value.trim())}
                        maxLength={100}
                      />
                      <label>New Password</label>
                    </div>
                    <div className="user-box">
                      <input
                        type="password"
                        name=""
                        autoComplete="off"
                        required
                        onChange={(e) => setConfirmPass(e.target.value.trim())}
                        maxLength={100}
                      />
                      <label>Confirm New Password</label>
                    </div>
                    <button onClick={handleResetPassword}>Reset Password</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
