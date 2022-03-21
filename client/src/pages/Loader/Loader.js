import React from "react";
import "./Loader.scss";
import Lottie from 'lottie-react';
import loader from "./../../assets/loader.json";

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <div className="anim-wrapper">
                <Lottie animationData={loader} autoPlay={true} loop={true} />
            </div>
        </div>
    );
}

export default Loader;