import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Events from "../EventPage/EventPage";
import ComingSoonDash from "../../components/ComingSoon/ComingSoon2";
import "./OpenPages.scss";

const OpenPages = ({ pageType }) => {
    return (
        <div className="h-100 w-100">
            <Navbar isBackground={true}/>
            {pageType === "events" && 
            <div className="open-page-content">
                <Events />
            </div>}
            {pageType === "coming-soon" && <ComingSoonDash />}
        </div>
    )
}

export default OpenPages;