import React from "react";
import "./ProshowCard.scss";

const ProshowCard = ({data}) => {
    return (
        <div className="proshow-card card-up">
            <div className="image-wrapper" style={{ backgroundImage: `url(${data.src})` }}>
                <div className="gradient">
                    <div className="proshow-card-header">
                        {/* <h6 className="font-light">{data.day}</h6> */}
                        {/* <p className="font-heavy">{data.date}</p> */}
                    </div>
                    <div className="artist-name">
                        <h2 className="font-heavy text-center">{data.name}</h2>
                        <p className="font-light text-center">{data.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProshowCard