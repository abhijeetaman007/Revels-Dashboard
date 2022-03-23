import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../Loader/Loader";
import axios from "axios";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const token = params.token;
    useEffect(() => {
        const toastId = toast.loading("Loading...");
        try {
            const res = axios.post(`/user/verify/${token}`);
            if(res.data.success) {
                navigate("/verified");
            } else {
                toast.error("Could not verify email address!", {
                    position: "bottom-center",
                    id: toastId,
                });
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }, [])
    return (
        <Loader />
    )
}

export default VerifyEmail;