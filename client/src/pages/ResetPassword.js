import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";

const ResetPassword = () => {
    const param = useParams()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const handleResetPassword = async () => {
        const toastId = toast.loading("Loading...");
        if(password !== confirmPass) {
            toast.error("Passwords do not match", { id: toastId })
        } else if (password === "" || confirmPass === "" || email === "") {
            toast.error("Please fill all the fields", { id: toastId })
        } else {    
            try {
                const res 
                    = await axios.post(
                        "/api/user/forgetpass/verify",
                        {
                            email: email,
                            newPassword: password,
                            token: param.passtoken
                        }
                    );
                if(res.data.success) {
                    toast.success(res.data.msg, { position: "bottom-center", id: toastId });
                }
            } catch (error) {
                toast.error("Sorry! An error occurred. Please try again later!", {
                    position: "bottom-center",
                    id: toastId
                })
            }   
        }
    }
    return (
        <div>
            <button onClick={handleResetPassword}>Reset Password</button>
        </div>
    )
}

export default ResetPassword