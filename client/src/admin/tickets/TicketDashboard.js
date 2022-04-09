import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logos/logo_white.png";
import { useParams } from "react-router-dom";
import "./TicketDashboard.scss";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
function Card({ info, user, searchUser }) {
  const auth = useAuth();
  const [receiptID, setreceiptID] = useState("");
  const [amount, setamount] = useState("");
  const [mode, setmode] = useState(null);
  const price =
    user.isMahe === 1 && user.college === "MANIPAL INSTITUTE OF TECHNOLOGY"
      ? info.mitPrice
      : info.mahePrice;
  const confirmPayment = async (e, delegateId) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const token = localStorage.getItem("adminid=");
      if (mode == null || amount == "" || receiptID == "") {
        return toast.error("Please Enter the required details", {
          id: toastId,
        });
      }
      if (price == -1) {
        return toast.error("Cannot Purchase", {
          id: toastId,
        });
      }
      if (price != amount) {
        return toast.error("Please Enter Correct Amount", {
          id: toastId,
        });
      }
      console.log(user, auth, "lol");
      const data = {
        delegateId,
        receiptID,
        amount,
        mode,
        user: user._id,
        adminID: auth.adminPayment ? auth.adminPayment._id : auth.admin._id,
      };
      const res = await axios.post(
        "/api/user/payment/approve",
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
        toast.success("Transaction Successfull", {
          id: toastId,
        });
        searchUser(e);
        return;
      } else
        return toast.error(res.data.msg, {
          id: toastId,
        });
    } catch (err) {
      console.log(err.toString());
      toast.error(err.response.data.msg, {
        id: toastId,
      });
      // console.log(err.toString());
    }
  };
  return (
    <>
      {" "}
      <p>
        {info.name} | {price}
      </p>
      <div className="pending-cards">
        <input
          type="text"
          className="login-input start-label"
          placeholder="Receipt ID"
          value={receiptID}
          required
          onChange={(e) => setreceiptID(e.target.value)}
        />
        <input
          type="text"
          className="login-input start-label"
          placeholder="Amount"
          value={amount}
          required
          onChange={(e) => setamount(e.target.value)}
        />
        <input
          type="radio"
          id="html"
          name="mode"
          value="Cash"
          onClick={() => setmode("Cash")}
        />
        <label for="html">Cash</label>
        <input
          type="radio"
          id="css"
          name="mode"
          value="UPI"
          onClick={() => setmode("UPI")}
        />
        <label for="css">UPI</label>
        <button
          className="tick-btn"
          onClick={(e) => confirmPayment(e, info._id)}
        >
          Confirm
        </button>
      </div>
    </>
  );
}
function TicketDashboard() {
  const auth = useAuth();
  const [delegateId, setdelegateId] = useState();
  const [user, setuser] = useState();
  const { cat } = useParams();

  console.log(user);
  useEffect(() => {
    console.log(auth.adminPayment);
  }, []);
  const searchUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminid=");
    console.log(token);
    const toastId = toast.loading("Loading...");
    try {
      console.log({ delegateID: delegateId });
      const res = await axios.get(
        "/api/user/delegatecard/getpendingdelegatecards?delegateID=" +
          delegateId,

        {
          headers: {
            authorization: token,
          },
        }
      );
      if (res.data.success) {
        setuser(res.data.data);
        toast.success("User Fetched", {
          id: toastId,
        });

        if (res.data.data == null)
          toast.error("No User Found", {
            id: toastId,
          });
      }
    } catch (error) {
      toast.error(error.response.data.msg, {
        id: toastId,
      });
      console.log(error);
    }
  };

  const color = user
    ? user.isMahe == 2
      ? "yellow"
      : user.isMahe == 1
      ? "orange"
      : "lightblue"
    : "white";
  return (
    <div className="ticket-dash">
      <div className="top">
        <img src={logo} />
        <h1>Payment Verify </h1>
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
        <button className="tick-btn" onClick={(e) => searchUser(e)}>
          Search{" "}
          <i
            style={{ fontSize: "14px", marginLeft: "10px" }}
            className="fa fa-search "
          ></i>
        </button>
      </div>
      <br></br>
      <div className="user-pay">
        <br />
        <div className="user-pay-header">
          {user ? (
            <strong style={{ color: color, fontSize: "20px" }}>
              <span style={{ color: "white" }}>Name: </span>
              {user?.name} <span style={{ color: "white" }}>| </span>{" "}
              <span style={{ color: "white" }}> Delegate Card ID: </span>
              {user?.userID}
            </strong>
          ) : (
            <strong>No User</strong>
          )}
          <br />
          <br />
          {user &&
            <div>
            {user.pendingDelegateCards
              .filter((pend) => {
                {
                  /* for dev: 624f451ea35cb9685d94f1d5 */
                }
                return cat === "inf"
                  ? pend._id !== "624f412aa35cb9685d94f1d4" &&
                      pend._id !== "624b37324fda25e0e4990ed2"
                  : pend._id == "624f412aa35cb9685d94f1d4" &&
                      pend._id !== "624b37324fda25e0e4990ed2";
              })
              .map((info, ind) => {
                return (
                  <>
                    <Card
                      key={ind}
                      info={info}
                      user={user}
                      searchUser={searchUser}
                    />
                    <br />
                  </>
                );
              })}
              <h2 className="text-success mb-4 mt-2">{ user.delegateCards.length > 0 ? "Bought delegate cards" : "No other delegate card(s) bought" }</h2>
              <div className="d-flex justify-content-center mb-4 flex-wrap">
                {user.delegateCards
              .filter((pend) => {
                {
                  /* for dev: 624f451ea35cb9685d94f1d5 */
                }
                return cat === "inf"
                  ? pend._id !== "624f412aa35cb9685d94f1d4" &&
                      pend._id !== "624b37324fda25e0e4990ed2"
                  : pend._id == "624f412aa35cb9685d94f1d4" &&
                      pend._id !== "624b37324fda25e0e4990ed2";
              })
              .map((info, ind) => {
                return (
                  <>
                    <p className="mx-2"><span><i className="fa fa-check-circle-o mr-1"></i></span>{info.name}</p>
                    <br />
                  </>
                );
              })}
              </div>
          </div>
          }
          {user && (
            <>
              {user.pendingDelegateCards.length == 0 && (
                <>
                  <p>No Delegate Cards requested for offline payment</p>
                  <br />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketDashboard;
