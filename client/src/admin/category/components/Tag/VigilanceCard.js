import React from "react";

const VigilanceCard = ({data, isEventScan}) => {
    console.log(isEventScan)
    console.log(data)
    let delegateCard;
    let college;
    let name;
    let status;
    let userId;
    let phone;
    let eventName;
    let members;
    let eventId;
    if(isEventScan){
        eventId = data.event.eventID;
        eventName = data.event.name;
        members = data.members;
    } else {
        delegateCard = data.delegateCards;
        college = data.college;
        name = data.name;
        status = data.status;
        userId = data.userID;
        phone = data.mobileNumber;
    }
    return (
        isEventScan 
        ? 
        <div className="d-flex flex-column p-3 bg-white" style={{ borderRadius: "10px" }}>
            <h4 className="font-heavy" style={{ fontSize: "1.3rem" }}> <span className="text-dark font-light">{eventId} |</span>  {eventName}</h4>
            <div className="font-medium text-muted" style={{ fontSize: "1rem" }}>
                {
                    members.map((mem, index) => {
                        return (
                            <p key={index}><span><i className="fa fa-user mr-2 text-muted"></i></span>{mem.user.name}</p>
                        )
                    })
                }
            </div>
        </div> 
        : <div className="d-flex flex-column p-3 bg-white" style={{ borderRadius: "10px" }}>
            <h4 className="font-heavy" style={{ fontSize: "1.3rem" }}> <span className="text-dark font-light">{userId} |</span>  {name}</h4>
            <p className="font-medium text-muted" style={{ fontSize: "0.7rem" }}>{status}</p>
            <h5 className="font-medium text-dark">{phone}</h5>
            <h5 className="font-medium text-danger">{college}</h5>
            <div className="d-flex flex-column flex-wrap">
                {
                    delegateCard.map((del, index) => {
                        return (
                            <p key={index}><span><i className="fa fa-check-circle-o mr-2 text-success"></i></span>{del.name}</p>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default VigilanceCard