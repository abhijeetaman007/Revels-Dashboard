import axios from "axios"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { TOKEN_ID } from "../utils/constants"

const ForgotPassword = () => {
    const [email, setEmail] = useState("parthivmenon01@gmail.com")

    // function to handle forgot password
    const handleForgotPassword = async () => {
        const toastId = toast.loading("Loading...");
        if(email !== "") {
            try {
                const res 
                    = await axios.post(
                        "/api/user/forgetpass",
                        { email: email }
                    )
                if(res.data.success) {
                    toast.success(res.data.msg, { position: "bottom-center", id: toastId });
                } else {
                    toast.error(res.data.msg[0][Object.keys(res.msg[0])[0]], { position: "bottom-center", id: toastId });
                }   
            } catch (error) {
                toast.error("Sorry! An error occurred. Please try again later!", {
                    position: "bottom-center",
                    id: toastId
                })
            }
        } else {
            toast.error("Email cannot be empty", { position: "bottom-center", id: toastId })
        }
    }
    return (
        <div>
            <button onClick={handleForgotPassword}>Forgot Password</button>
        </div>
    )
}

export default ForgotPassword