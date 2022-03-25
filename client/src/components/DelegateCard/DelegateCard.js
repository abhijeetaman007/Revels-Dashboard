import React from "react";
import "./DelegateCard.scss";

const DelegateCard = ({ 
    colorArr, 
    idx, 
    displayRazorpay, 
    data, 
    isMahe, 
    isBought 
}) => {
  return (
      <div className={`del-card card-up m-1 ${colorArr[idx % 3].toString()} font-medium`}>
        <div className="del-content">
          <div>
            <h1 className="text-white">
              {data.name}
              {isBought && <span><i className="fa fa-check-circle mx-2"></i></span>}
            </h1>
            <p className={`font-light text-white ${isBought && "bought"}`}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took
            </p>
          </div>
          <div className="blank"></div>
          <div className={`price ${isBought && "bought"}`}>
            <div className="clg px-1">
              <p>&#x20B9;{isMahe ? data.mahePrice : data.nonMahePrice}</p>
              <button disabled={isBought} onClick={() => displayRazorpay(data._id)}>
                {isBought ? "BOUGHT!" : "BUY NOW"}
              </button>
            </div>
          </div>
          <div className="blank"></div>
        </div>
      </div>
  );
}

export default DelegateCard;