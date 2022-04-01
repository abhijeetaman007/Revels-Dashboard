import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/logos/logo_white.png";
import "./TicketDashboard.scss";
import { useAuth } from "../../context/AuthContext";
function TicketDashboard() {
  const auth = useAuth();
  const [delegateId, setdelegateId] = useState();

  const [receiptID, setreceiptID] = useState();
  const [amount, setamount] = useState();
  const [user, setuser] = useState();
  const [mode, setmode] = useState();
  const confirmPayment = async (e ,delegateId ) => {
    const token = localStorage.getItem("adminid=");

    e.preventDefault();
    try {
      const data = { delegateId, receiptID, amount, mode ,user: user._id};
      const res = await axios.post(
        "/api/admin/login",
        {
          data,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (res.data.success) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const searchUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminid=");
    try {
      const res = await axios.get("/api/user/getpendingdelegatecards", {
        headers: {
          authorization: token,
        },
      });
      if (res.data.success) {
        setuser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ticket-dash">
      <div className="top">
        <img src={logo} />
        <h1>Payment Verify</h1>
      </div>

      <p>
        <button className="tick-btn" onClick={auth.adminLogout}>
          Log Out <i className="fa fa-power-off"></i>
        </button>
      </p>
      <div className="search-box">
        <input
          type="text"
          className="login-input start-label"
          placeholder="User Delegate ID"
          value={delegateId}
          onChange={(e) => setdelegateId(e.target.value)}
        />
        <button className="tick-btn" onClick={(e) => searchUser()}>
          Search<i className="fa fa-search "></i>
        </button>
      </div>
      <div className="user-pay">
        <div className="user-pay-header">
          <h2>
            Name
            <br />
            <p>userID</p>
          </h2>
          user.pendingDelegateCards.
          {[1, 2, 3].map((info, ind) => {
            return (
              <div className="pending-cards">
                <p>Name</p>
                <input
                  type="text"
                  className="login-input start-label"
                  placeholder="Receipt ID"
                  value={receiptID}
                  onChange={(e) => setreceiptID(e.target.value)}
                />
                <input
                  type="text"
                  className="login-input start-label"
                  placeholder="Amount"
                  value={receiptID}
                  onChange={(e) => setamount(e.target.value)}
                />

                <input type="radio" id="html" name="mode" value="Cash" onClick={()=>setmode("Cash")} />
                <label for="html">Cash</label>
                <input type="radio" id="css" name="mode" value="UPI" onClick={()=>setmode("UPI")}/>
                <label for="css">UPI</label>

                <button className="tick-btn" onClick={(e) => confirmPayment(e,info._id)}>
                  Confirm
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TicketDashboard;
