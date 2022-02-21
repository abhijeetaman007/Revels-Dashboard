import React, { useState } from "react"
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
    const auth = useAuth();

    const [email, setEmail] = useState("parthivmenon01@gmail.com");
    const [password, setPassword] = useState("password1");
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
        <div>
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}

export default SignIn;