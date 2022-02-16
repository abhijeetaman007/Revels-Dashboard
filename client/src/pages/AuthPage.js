import React, { useEffect } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Register from "../components/Register";

const AuthPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(!auth.loading) {
            if(auth.user) {
                navigate("/")
            }
        }
    }, [auth.loading]);

    return (
        <div>
            Auth Page
            <Register />
        </div>
    )
}

export default AuthPage