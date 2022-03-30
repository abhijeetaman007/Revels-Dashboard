import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import "./Rulebook.scss"
import file from "./../../assets/files/Quick Recap OE AW.pdf";

const Rulebook = () => {
    return (
        <div className="h-100 w-100">
            <Navbar isBackground={true}/>
            <div className="pdf-viewer-wrapper">
                <Viewer fileUrl={file} />;
            </div>
        </div>
    );
}

export default Rulebook;