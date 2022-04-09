import React from "react";

const VigilanceCard = ({data, isEventScan}) => {
    console.log(data)
    const delegateCard = data.delegateCards;
    const college = data.college;
    const name = data.name;
    const status = data.status;
    const userId = data.userID;
    const phone = data.mobileNumber;
    return (
        <div className="d-flex flex-column p-3 bg-white" style={{ borderRadius: "10px" }}>
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