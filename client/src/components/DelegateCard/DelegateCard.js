import React from "react";
import "./DelegateCard.scss";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const DelegateCard = ({ displayRazorpay, data, isMahe, cashPay, isBought }) => {
  const [bought, setBought] = useState(isBought);
  const auth = useAuth();
  const cardPrice =
    isMahe === 1
      ? data.mitPrice
      : isMahe === 2
      ? data.mahePrice
      : data.nonMahePrice;
  return (
    data.isActive && (
      <div
        className={`del-card card-up m-1 ${data.type.toLowerCase()} font-medium`}
      >
        <div className="del-content">
          <div>
            <p className="del-type">{data.type}</p>
            <h1 className="text-white">
              {data.name}
              {bought === 1 ? (
                <span style={{ color: "white" }}>
                  <i className="fa fa-check-circle mx-2"></i>
                </span>
              ) : (
                bought === 2 && (
                  <span style={{ color: "white" }}>
                    <i className="fa fa-clock-o mx-2"></i>
                  </span>
                )
              )}
            </h1>
            {/* <p className={`font-light text-white ${bought && "bought"}`}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took
          </p> */}
          </div>
          <div className="blank"></div>
          <div className={`price ${bought && "bought"}`}>
            <div className="clg px-1">
              <p>&#x20B9;{cardPrice}</p>
              {bought == 1 ? (
                <button disabled={true}>Purchased</button>
              ) : bought == 2 ? (
                <>
                  <button disabled={true}>
                    Payment pending (Or Pay via Cash){" "}
                  </button>
                  <button
                    disabled={true}
                    onClick={() =>
                      displayRazorpay(data._id, cardPrice, auth.user)
                    }
                  >
                    Pay Online
                  </button>
                </>
              ) : (
                <>
                  <button
                    disabled={bought}
                    onClick={async () => {
                      const d = await cashPay(data._id);
                      if (d.status == 200) setBought(2);
                    }}
                  >
                    Pay Via Cash
                  </button>{" "}
                  <button
                    disabled={true}
                    onClick={() =>
                      displayRazorpay(data._id, cardPrice, auth.user)
                    }
                  >
                    Pay Online
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="blank"></div>
        </div>
      </div>
    )
  );
};

export default DelegateCard;
