import React, { useState } from "react"
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const SignIn = (props) => {
    const auth = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // handles input field validation
    const validateForm = (toastId) => {
        if(
            email === "" ||
            password === ""
        ) {
            toast.error("Please fill both the fields", {
              id: toastId
            });
            return false;
        }
        return true
    }
    // handles submit of login form
    const handleSubmit = async (e) => {
        e.preventDefault()
        const toastId = toast.loading("Loading...");
        if(validateForm(toastId)){
            try {
                const res = await auth.userLogin(
                    email,
                    password
                );
                if(res.success) {
                    toast.success(res.msg, { position: "bottom-center", id: toastId });
                } else {
                    toast.error(res.msg[0][Object.keys(res.msg[0])[0]], { position: "bottom-center", id: toastId });
                }
            } catch (error) {
                toast.error(error.response.data.msg, {
                    position: "bottom-center",
                    id: toastId
                })
            }
        }
    }
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
                <div className="user-box">
                  <input
                    type="password"
                    name=""
                    autoComplete="off"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    maxLength={100}
                  />
                  <label>Password</label>
                </div>
                <button onClick={(e) => handleSubmit(e)} className="font-medium">Login</button>
            </form> 
            <div className="my-2 d-flex justify-content-between">
                <p onClick={() => {props.setLogin(false); props.setForgotPass(true)}} className="font-medium">Forgot Password</p>
                <p href="javascript:;" className="font-medium" onClick={() => {props.setLogin(false); props.setRegister(true)}}>
                    Create Account
                </p>
            </div>
        </div>
    )
}

export default SignIn;