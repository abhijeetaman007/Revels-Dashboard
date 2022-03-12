import React from "react";
import "./EventCard.scss";

const EventCard = () => {
    return (
        <div className="event-card-wrapper">
            <div className="event-content">
                <div className="event-header">
                    <div className="event-area">
                        <p className="font-heavy">CATEGORY NAME</p>
                        <h3 className="font-light">Event Name</h3>
                    </div>
                    <div className="button-area">
                        <button className="font-heavy">Online Event</button>
                        <button className="font-medium">Register</button>
                    </div>
                </div>
                <div className="tags-line">
                    {
                        ["Tag One", "Tag Two", "Tag Three"].map((val, index) => {
                            return (
                                <p key={index} className="font-light">
                                    {val} ◦
                                </p>
                            )
                        })
                    }
                </div>
                <div className="description font-medium">
                    As we welcome various participants not only from our own college but also from different colleges to be a part 
                    of Revels, it’ll be your job to help maintain the database for each participant throughout as a part of the system admin 
                    team while also assisting with 
                </div>
                <div className="data-area">
                    <div className="box">
                        <p className="font-heavy">TEAM SIZE</p>
                        <h3 className="font-light">2 - 4 Members</h3>
                    </div>
                    <div className="box">
                        <p className="font-heavy">DATE</p>
                        <h3 className="font-light">14 April 2022</h3>
                    </div>
                    <div className="box">
                        <p className="font-heavy">VENUE</p>
                        <h3 className="font-light">Football Ground</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCard;