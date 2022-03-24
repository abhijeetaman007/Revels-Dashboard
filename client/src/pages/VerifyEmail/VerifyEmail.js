import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../Loader/Loader";
import axios from "axios";
import VerifyAnimation from "../../components/VerifyAnimation/VerifyAnimation";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const token = params.token;
    const [isVerified, setIsVerified] = useState(false);
    useEffect(() => {
        const toastId = toast.loading("Loading...");
        const verifyEmail = async () => {
            try {
                const res = await axios.get(`/api/user/verify/${token}`);
                if(res.data.success) {
                    setIsVerified(true);
                } else {
                    toast.error("Could not verify email address!", {
                        position: "bottom-center",
                        id: toastId,
                    });
                    setTimeout(() => {
                        navigate("/login");
                    }, 3000)
                }
            } catch (error) {
                console.log(error);
            }
        }
        verifyEmail();
    }, [])
    return (
        !isVerified ? <Loader /> : <VerifyAnimation />
    );
}

export default VerifyEmail;