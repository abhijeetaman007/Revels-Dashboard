import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { TOKEN_ID } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import DelegateCard from "../../components/DelegateCard/DelegateCard";
import Loader from "../Loader/Loader";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

async function cashPayment(delegateCardID) {
  const resp = await axios.post(
    "/api/user/payment/cash",
    {
      delegateCard: delegateCardID,
    },
    {
      headers: {
        authorization: localStorage.getItem(TOKEN_ID),
      },
    }
  );
  let data = resp.data.data;

  console.log("POST DATA : ", data);
  return resp;
}

async function displayRazorpay(delegateCardID, amount, user) {
  // const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  // console.log("Load Script ", res);
  // if (!res) {
  //   alert("Razorpay SDK failed to load.");
  //   return;
  // }
  const data = {
    login: "192",
    pass: "Test@123",
    ttype: "NBFundTransfer",
    prodid: "NSE",
    amt: amount.toString() + ".00",
    txncur: "INR",
    txnamt: amount.toString() + ".00",
    clientcode: "NAVIN",
    transid: "1000",
    datepick: "01/03/2019 16:20:00",
    custacc: "100000036600",
    udf1: user.name,
    udf2: user.email,
    udf3: user.mobileNumber,
    udf4: delegateCardID,
    ru: "http://localhost:8000/api/Response",
    delegateCardID: delegateCardID,
  };
  // const data = {
  //   login: "332432",
  //   pass: process.env.REACT_APP_ATOM_PASS,
  //   ttype: "NBFundTransfer",
  //   prodid: "REVEL",
  //   amt: amount.toString() + ".00",
  //   txncur: "INR",
  //   txnamt: amount.toString() + ".00",
  //   clientcode: "Akash",
  //   transid: "1000",
  //   datepick: "01/03/2019 16:20:00",
  //   custacc: "100000036600",
  //   udf1: user.name,
  //   udf2: user.email,
  //   udf3: user.mobileNumber,
  //   udf4: delegateCardID,
  //   ru: "https://revelsmit.in/api/Response",
  //   delegateCardID: delegateCardID,
  // };
  // Object.keys(data).forEach((element) => {
  //   bodyFormData.append(element, data[element]);
  // });
  //Helps start an order and register order with razorpay
  const resp = await axios.post("/api/Atom", data);
  // fetch("http://localhost:3000/api/Atom", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  //   mode: "no-cors",
  //   redirect: "follow",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((res) => console.log(res));

  // let d = resp.json;
  console.log(resp);
  window.open(resp.data.url, "_self");

  // console.log("POST DATA : ", data);
}

function DelegatePage() {
  const [delegateCard, setDelegateCard] = useState([]);
  const auth = useAuth();
  const user = auth.user;
  const isMyDelCard = (delCardId) => {
    if (user.delegateCards.includes(delCardId)) {
      return 1;
    } else if (user.pendingDelegateCards.includes(delCardId)) {
      return 2;
    } else {
      return 0;
    }
  };
  useEffect(() => {
    // To get all types of proshow and non proshow
    const fetchDelegateCards = async () => {
      const resp = await axios.get("/api/user/delegatecard/getall");
      console.log("DATA ", resp.data);
      setDelegateCard(resp.data.data);
    };
    fetchDelegateCards();
  }, []);
  // const colorArr = ["blue", "purple", "black", "pink", "white", "light-pink"];
  const colorArr = [
    "proshow",
    "inf",
    "gaming",
    "workshops",
    "general",
    "sports",
  ];
  return auth.loading ? (
    <Loader />
  ) : (
    <div className="delegate-container">
      <div className="d-flex flex-md-row flex-column flex-wrap m-0 p-0">
        {delegateCard.map((data, index) => {
          return (
            <DelegateCard
              key={index}
              colorArr={colorArr}
              idx={index}
              displayRazorpay={displayRazorpay}
              data={data}
              isMahe={
                user.college === "MANIPAL INSTITUTE OF TECHNOLOGY"
                  ? 1
                  : user.isMahe
                  ? 2
                  : 0
              }
              cashPay={cashPayment}
              isBought={isMyDelCard(data._id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DelegatePage;
