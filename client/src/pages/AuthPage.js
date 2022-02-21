import React, { useEffect } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Register from "../components/Register";
import SignIn from "../components/SignIn";
import ForgotPassword from "../components/ForgotPassword";

const AuthPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(!auth.loading) {
            if(auth.user) {
                navigate("/dashboard")
            }
        }
    }, [auth.loading]);

    return (
        <div>
            Auth Page
            <Register />
            <SignIn />
            <ForgotPassword />
        </div>
    )
}

export default AuthPage