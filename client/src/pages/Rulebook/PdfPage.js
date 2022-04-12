import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import "./Rulebook.scss"

const PdfPage = ({pdf}) => {
    let pdfPath;
    if(pdf === "rulebook") {
        pdfPath = "/rulebook.pdf";
    } else if(pdf === "mitpost") {
        pdfPath = "/mitpost.pdf";
    } else if(pdf === "schedule-cultural") {
        pdfPath = "/schedule1.pdf";
    } else if(pdf === "schedule-sports") {
        pdfPath = "/sportsschedule.pdf";
    }
    return (
        <div className="h-100 w-100">
            <Navbar isBackground={true}/>
            <div className="pdf-viewer-wrapper">
                <Viewer fileUrl={pdfPath} />;
            </div>
            <div className="download-rule">
                <a href="https://docs.google.com/spreadsheets/d/1z0cVObbbZ4gcXT5qlXEHZ5x5P-pp73qMP2R4Zosfd-k/edit?usp=drivesdk" target="_blank" rel="noreferrer">
                    <button className="font-medium">
                        Sports Fixtures <span><i className="fa fa-external-link"></i></span>
                    </button>
                </a>
                <a href={pdfPath} download>
                    <button className="font-medium">Download PDF</button>
                </a>
            </div>
        </div>
    );
}

export default PdfPage;