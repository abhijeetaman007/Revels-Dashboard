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
        const verifyEmail = async () => {
            try {
                const res = await axios.get(`/api/user/verify/${token}`);
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
        }
        verifyEmail();
    }, [])
    return (
        <Loader />
    )
}

export default VerifyEmail;