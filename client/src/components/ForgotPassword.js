import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // function to handle forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    if (email !== "") {
      try {
        console.log(email);
        const res = await axios.post("/api/user/forgetpass", { email: email });
        if (res.data.success) {
          toast.success(res.data.msg, {
            position: "bottom-center",
            id: toastId,
          });
        } else {
          toast.error(res.data.msg[0][Object.keys(res.msg[0])[0]], {
            position: "bottom-center",
            id: toastId,
          });
        }
      } catch (error) {
        console.log(error.toString());
        toast.error("Sorry! An error occurred. Please try again later!", {
          position: "bottom-center",
          id: toastId,
        });
      }
    } else {
      toast.error("Email cannot be empty", {
        position: "bottom-center",
        id: toastId,
      });
    }
  };
  return (
    <div className="form-wrapper">
      <h2 className="font-light auth-heading">FORGOT PASSWORD</h2>
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
          <label>Registered Email ID</label>
        </div>
        <button onClick={handleForgotPassword}>Send Email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
