import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Auth.css"

import SignIn from "../../components/SignIn/SignIn"; 
import Register from "../../components/Register/Register";
import ForgotPassword from "../../components/ForgotPassword";

const AuthPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    
    const [login, setLogin] = useState(true);
    const [register, setRegister] = useState(false);
    const [forgotPass, setForgotPass] = useState(false);
    const [resetPass, setResetPass] = useState(false)

    useEffect(() => {
        if(!auth.loading) {
            if(auth.user) {
                navigate("/dashboard")
            }
        }
    }, [auth.loading]);

    return (
        <div className="auth-wrapper">
            <div className="row">
                <div className="col-8 hello-area d-flex justify-content-center align-items-center">
                    <div className="hello-box">
                        p
                    </div>
                </div>
                <div className="col-4 login-area d-flex flex-col justify-content-center align-items-center">
                    {login && <SignIn setLogin={setLogin} setRegister={setRegister} setForgotPass={setForgotPass}/>}
                    {register && <Register setLogin={setLogin} setRegister={setRegister} setForgotPass={setForgotPass}/>}
                    {forgotPass && <ForgotPassword setLogin={setLogin} setRegister={setRegister} setForgotPass={setForgotPass}/>}
                </div>
            </div>
        </div>
    )
}

export default AuthPage