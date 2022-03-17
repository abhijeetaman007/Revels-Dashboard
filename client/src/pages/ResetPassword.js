import React, { useEffect, useState } from 'react';
import { useAuth } from "./../context/AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import './AuthPages/Auth.css';
import axios from 'axios';

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();

  const passToken = params.passToken;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

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
                "/api/user/forgetpass/verify", {
                  email,
                  token: passToken,
                  newPassword: password
                }
            );
        if(res.data.success) {
          toast.success("Password reset successfully", { position: "bottom-center", id: toastId });
          setTimeout(() => {
            navigate("/login");
          }, 3000)
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
                        type="email"
                        name=""
                        autoComplete="off"
                        required
                        onChange={(e) => setEmail(e.target.value.trim())}
                        maxLength={100}
                      />
                      <label>Email ID</label>
                    </div>
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
