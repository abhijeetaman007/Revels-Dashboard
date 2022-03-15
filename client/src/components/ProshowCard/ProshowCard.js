import React from "react";
import "./ProshowCard.scss";
import ArrowVector from '../../assets/right-arrow.png';

const ProshowCard = () => {
    return (
        <div className="proshow-card">
            <div className="image-wrapper">
                <div className="gradient">
                    <div className="proshow-card-header">
                        <h6 className="font-light">DAY ONE</h6>
                        <p className="font-heavy">13 April 2022</p>
                    </div>
                    <div className="artist-name">
                        <h2 className="font-heavy">Prateek Kuhad</h2>
                        <p className="font-light">Indian Songwriter-Singer</p>
                    </div>
                    <button>
                      Buy Ticket
                      <img
                        style={{ height: '20px', marginLeft: '5px', marginTop: '3px' }}
                        src={ArrowVector}
                      ></img>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProshowCard