import React, { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignIn = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sendVerif, setVerifMail] = useState(false);
  // handles input field validation
  const validateForm = (toastId) => {
    if (email === "" || password === "") {
      toast.error("Please fill both the fields", {
        id: toastId,
      });
      return false;
    }
    return true;
  };
  // handles submit of login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    if (validateForm(toastId)) {
      try {
        setEmail(email.toLowerCase());
        const res = await auth.userLogin(email, password);
        if (res.success) {
          toast.success(res.msg, { position: "bottom-center", id: toastId });
          navigate("/dashboard/events");
        } else {
          toast.error(res.msg[0][Object.keys(res.msg[0])[0]], {
            position: "bottom-center",
            id: toastId,
          });
        }
      } catch (error) {
        if (error.response.data.msg === "Please Verify Email to login") {
          setVerifMail(true);
        }
        console.log(error.response.data.msg, "lol");
        toast.error(error.response.data.msg, {
          position: "bottom-center",
          id: toastId,
        });
      }
    }
  };
  return (
    <div className="form-wrapper">
      <h2 className="font-light auth-heading">LOGIN</h2>
      <form className="auth-form">
        <div className="user-box">
          <input
            type="text"
            name=""
            autoComplete="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            maxLength={100}
          />
          <label>Email</label>
        </div>
        <div className="user-box d-flex justify-content-center align-items-center">
          <input
            type={`${isEyeOpen ? "text" : "password"}`}
            name=""
            autoComplete="off"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            maxLength={100}
            className="password-input"
          />
          <div className="mb-2 eye" onClick={() => setIsEyeOpen(!isEyeOpen)}>
            <i
              className={`fa ${
                isEyeOpen ? "fa-eye" : "fa-eye-slash"
              } text-white`}
            ></i>
          </div>
          <label>Password</label>
        </div>
        <button onClick={(e) => handleSubmit(e)} className="font-medium">
          Login
        </button>
      </form>
      <div className="my-2 d-flex justify-content-between">
        <p
          onClick={() => {
            props.setLogin(false);
            props.setForgotPass(true);
          }}
          className="font-medium"
        >
          Forgot Password
        </p>
        <p
          href="javascript:;"
          className="font-medium"
          onClick={() => {
            props.setLogin(false);
            props.setRegister(true);
          }}
        >
          Create Account
        </p>
      </div>
      {sendVerif && (
        <div className="user-box d-flex justify-content-center align-items-center">
          <p
            onClick={async () => {
              toast.success("Verification Mail Sent Successfully", {
                position: "bottom-center",
                id: toast.loading("Loading..."),
              });
              setVerifMail(false);
              const res = await auth.resendVerif(email, password);
            }}
            className="font-medium"
          >
            Resend Verification Mail
          </p>
        </div>
      )}
    </div>
  );
};

export default SignIn;
