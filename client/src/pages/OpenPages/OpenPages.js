import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Events from "../EventPage/EventPage";
import ComingSoonDash from "../../components/ComingSoon/ComingSoon2";
import "./OpenPages.scss";
import Proshow from "../Proshow/Proshow";

const OpenPages = ({ pageType }) => {
    return (
        <div className="h-100 w-100">
            <Navbar isBackground={true}/>
            {pageType === "events" && 
            <div className="open-page-content">
                <Events isPublic={true}/>
            </div>}
            {pageType === "coming-soon" && <ComingSoonDash />}
            {pageType === "proshow" && <Proshow isPublicProshow={true}/>}
        </div>
    )
}

export default OpenPages;