import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";
import Tag from "../components/Tag/Tag";
import axios from "axios";
import { ADMIN_TOKEN_ID } from "../../../utils/constants";
import "./EventTitle.css";
import Modal from "react-modal";
import EventModal from "./EventModal";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
// import MultiSelect from './MultiSelect';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import QrReader from "react-web-qr-reader";

import VigilanceCard from "../components/Tag/VigilanceCard";
//import TicketDashboard from '../../tickets/TicketDashboard';

const Dashboard = () => {
  const [selDel, setSelDel] = useState([]);
  const [teams, setTeams] = useState([]);
  const handleChange = async (e) => {
    console.log(e);
    setSelDel(e);
  };
  const [scanQR, setScan] = useState(false);
  const [eventScanQR, setScanE] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [delCards, setDelCards] = useState([]);
  const [eventId, setEventId] = useState();

  const [options, setOptions] = useState([]);
  const [allEventDetails, setallEventDetails] = useState([]);
  const [eventTabSC, seteventTabSC] = useState(0);
  const getDelCards = async () => {
    try {
      const res = await axios.get("/api/user/delegatecard/getall");
      //console.log(res.data.data);
      setDelCards(res.data.data);
      const arr = [];
      res.data.data.map((x) => {
        //console.log(x);
        arr.push({ value: x.cardID, label: x.name });
      });
      //console.log('arr', arr);
      setOptions(arr);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllEvents = async () => {
    console.log("all events");
    const header = {
      authorization: localStorage.getItem(ADMIN_TOKEN_ID),
    };
    try {
      const res = await axios.get("/api/admin/operations/getallevents", {
        headers: header,
      });
      setallEventDetails(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err.repsonse.data);
    }
  };
  const handleOnChange = (e) => {
    e.preventDefault();
    console.log("click");
    setIsChecked(!isChecked);
  };
  const navigate = useNavigate();
  const auth = useAuth();

  const validateForm = () => {
    if (
      data.name === "" ||
      data.minMembers === 0 ||
      data.maxMembers === 0 ||
      data.description === "" ||
      data.eventType === "" ||
      data.mode === "" ||
      head1N === "" ||
      head1P === 0 ||
      head1E === ""
    ) {
      return false;
    }
    return true;
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setNumTags(1);
    setT1("");
    setT2("");
    setT3("");
    setT4("");
    setIsChecked(false);
    setIsOpen(false);
  }
  const header = {
    authorization: localStorage.getItem(ADMIN_TOKEN_ID),
  };
  const [category, setCategory] = useState({});
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    try {
      const res = await axios.get("/api/admin/category/event/getevents", {
        headers: header,
      });
      console.log(res.data.data);
      setEvents(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getCategory = async () => {
    try {
      const res = await axios.get("/api/admin/category", {
        headers: header,
      });
      if (res.data.success) {
        console.log(res.data.data);
        setCategory(res.data.data);
      } else {
        toast.error("Error setting category!");
      }
    } catch (err) {
      console.log(err);
    }
    console.log(category)
  };
  // const getTeams = async (event, name, id) => {
  //   try {
  //     await axios.get(
  //       "/api/admin/category/event/participants/" +
  //         event +
  //         "/" +
  //         name +
  //         "/" +
  //         id,
  //       {
  //         headers: header,
  //       }
  //     );
  //     // if (res.data.success) {
  //     //   console.log(res.data.data);
  //     //   setTeams(res.data.data);
  //     // } else {
  //     //   toast.error("Error setting category!");
  //     // }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //add state for all the fields in data
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");
  const [t3, setT3] = useState("");
  const [t4, setT4] = useState("");
  const [head1N, setHead1N] = useState("");
  const [head2N, setHead2N] = useState("");
  const [head1E, setHead1E] = useState("");
  const [head2E, setHead2E] = useState("");
  const [head1P, setHead1P] = useState("");
  const [head2P, setHead2P] = useState("");
  const [numTags, setNumTags] = useState(1);

  const [data, setData] = useState({
    eventID: "",
    name: "",
    description: "",
    eventType: "",
    mode: "",
    participationCriteria: "",
    prize: "",
    minMembers: 0,
    maxMembers: 0,
    eventHeads: [],
    teamDelegateCard: false,
    delegateCards: [],
    tags: [],
  });
  const addTagElement = () => {
    setNumTags(numTags + 1);
  };
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const addEvent = async () => {
    const delcardsselected = [];
    if (selDel.length > 0) {
      selDel.map((x) => {
        delcardsselected.push(x.value);
      });
    }
    console.log("ffff", delcardsselected);
    console.log("add", isChecked);
    let tagsarr = [];

    if (t1 !== "") tagsarr.push(t1.toUpperCase().trim());
    if (t2 !== "") tagsarr.push(t2.toUpperCase().trim());
    if (t3 !== "") tagsarr.push(t3.toUpperCase().trim());
    if (t4 !== "") tagsarr.push(t4.toUpperCase().trim());
    let headsarr = [];
    if (head1N !== "")
      headsarr.push({
        name: head1N.toUpperCase().trim(),
        phoneNo: head1P,
        email: head1E,
      });
    if (head2N !== "")
      headsarr.push({
        name: head2N.toUpperCase().trim(),
        phoneNo: head2P,
        email: head2E,
      });
    if (!validateForm()) {
      toast.error("Please fill in all the fields");
    }
    // else if (
    //   head1P.toString().length !== 10 ||
    //   (head2P.toString().length !== 0 && head2P.toString().length !== 10)
    // ) {
    //   toast.error('Please enter valid phone number');
    // } else if (validateEmail(head1E.toString()) === false) {
    //   toast.error('Please enter valid email for Head 1');
    // } else if (
    //   head2E.toString().length !== 0 &&
    //   validateEmail(head2E) === false
    // ) {
    //   toast.error('Please enter valid email for Head 2');
    // }
    else if (
      (head2E != "" && (head2P == "" || head2N == 0)) ||
      (head2N != 0 && (head2P == "" || head2E == "")) ||
      (head2P != "" && (head2E == "" || head2N == 0))
    ) {
      toast.error("Please complete Event Head 2's details");
    } else {
      try {
        const eventData = {
          name: data.name,
          description: data.description,
          eventType: data.eventType,
          mode: data.mode,
          participationCriteria: data.participationCriteria,
          prize: data.prize,
          minMembers: data.minMembers,
          maxMembers: data.maxMembers,
          eventHeads: headsarr,
          tags: tagsarr,
          teamDelegateCard: isChecked,
          delegateCards: delcardsselected,
          eventDateTime: data.eventDateTime,
          eventVenue: data.eventVenue,
        };
        console.log(eventData);
        const res = await axios.post(
          "/api/admin/category/event/add",
          {
            name: eventData.name,
            description: eventData.description,
            eventType: eventData.eventType,
            mode: eventData.mode,
            participationCriteria: eventData.participationCriteria,
            prize: eventData.prize,
            minMembers: eventData.minMembers,
            maxMembers: eventData.maxMembers,
            eventHeads: headsarr,
            tags: tagsarr,
            teamDelegateCard: eventData.teamDelegateCard,
            delegateCards: eventData.delegateCards,
            eventDateTime: eventData.eventDateTime,
            eventVenue: eventData.eventVenue,
          },
          {
            headers: {
              authorization: localStorage.getItem(ADMIN_TOKEN_ID),
            },
          }
        );
        if (res.data.success) {
          setData({
            eventID: "",
            name: "",
            description: "",
            eventType: "",
            mode: "",
            participationCriteria: "",
            prize: "",
            minMembers: 0,
            maxMembers: 0,
            eventHeads: [],
            teamDelegateCard: false,
            delegateCards: [],
            tags: [],
            head1P: 0,
            head2P: 0,
            head1E: "",
            head2E: "",
            head1N: "",
            head2N: "",
            t1: "",
            t2: "",
            t3: "",
            t4: "",
          });
          closeModal();
          toast.success("Event added successfully");
          getEvents();
        } else {
          toast.error(res.data.msg);
        }
      } catch (err) {
        toast.error("err");
        console.log(err);
      }
    }
  };
  useEffect(() => {
    getAllEvents();
    getDelCards();
    getCategory();
    getEvents();
  }, []);
  const deleteEvent = async (id) => {
    if(window.confirm("Do you want to delete this event? This action is irreversible!")) {
      const toastId = toast.loading("Deleting...");
      try {
        const res = await axios.post(
          "/api/admin/category/event/delete",
          {
            eventID: id,
          },
          {
            headers: {
              authorization: localStorage.getItem(ADMIN_TOKEN_ID),
            },
          }
        );
        toast.dismiss(toastId);
        if (res.data.success) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const [delay, setDelay] = useState(500);
  const [result, setResult] = useState({});
  const [dataLoaded, setdataLoaded] = useState(false);
  const handleScan = async (d) => {
    try {
      setResult(d.data);
      if (result != null) {
        console.log("hanld scan", d);
        const token = result;
        if (token !== undefined && typeof token === "string") {
          console.log(token);
          const res = await axios.get("/api/admin/vigilance/user/" + token);
          //console.log(res.data.data);
          setResult(res.data.data);
          setdataLoaded(true);
        }
      }
      // const arr = [];
      // res.data.data.map((x) => {
      //   //console.log(x);
      //   arr.push({ value: x.cardID, label: x.name });
      // });
      // //console.log('arr', arr);
      // setOptions(arr);
    } catch (err) {
      console.log(err);
    }
  };
  const handleScanEvent = async (d, eventID) => {
    console.log("handle scan event", d);
    try {
      setResult(d.data);
      if (result != null) {
        console.log(result);
        const token = result;
        console.log(JSON.stringify(result));
        console.log(eventID);

        if (token !== undefined && typeof token === "string") {
          const res = await axios.get(
            "/api/admin/vigilance/user/event/" + eventID + "/" + token
          );

          if (res.data.success) {
            console.log(res);
            setResult(res.data.data);
            setdataLoaded(true);
          }
        }
      }
      // const arr = [];
      // res.data.data.map((x) => {
      //   //console.log(x);
      //   arr.push({ value: x.cardID, label: x.name });
      // });
      // //console.log('arr', arr);
      // setOptions(arr);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.msg);
      setTimeout(() => {
        setScanE(false);
      }, 500);
      console.log(err.response.data.msg);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };
  return (
    <div>
      <Navbar />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="overlay"
      >
        <div className="cross" onClick={closeModal}>
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <label className="font-medium mt-2">
          Event Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <div className="d-flex flex-md-row flex-column">
          <div className="w-md-50 w-100 mx-md-1">
            <label className="font-medium mt-2">
              Min Members<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              name=""
              autoComplete="off"
              required
              maxLength={100}
              className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
              placeholder="Minimum number of members"
              onChange={(e) => setData({ ...data, minMembers: e.target.value })}
            />
          </div>
          <div className="w-md-50 w-100 mx-md-1">
            <label className="font-medium mt-2">
              Max Members<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              name=""
              autoComplete="off"
              required
              maxLength={100}
              className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
              placeholder="Maximum number of members"
              onChange={(e) => setData({ ...data, maxMembers: e.target.value })}
            />
          </div>
        </div>
        <label className="font-medium mt-3">
          Event Description<span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          rows="4"
          type="text"
          name=""
          autoComplete="off"
          required
          maxLength={2000}
          className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event description"
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <label className="font-medium mt-3">
          Delegate Cards Needed for Event
          <span style={{ color: "red" }}>*</span>
        </label>
        <Select
          closeMenuOnSelect={false}
          components={makeAnimated}
          isMulti
          options={options}
          onChange={(e) => handleChange(e)}
        />
        <label for="mode" className="font-medium mt-3">
          Event Type<span style={{ color: "red" }}>*</span>
        </label>
        <select
          name=""
          id="mode"
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          onChange={(e) => setData({ ...data, eventType: e.target.value })}
        >
          <option selected="true" disabled="disabled" value="">
            Select Option
          </option>
          <option value="CULTURAL">Cultural</option>
          <option value="SPORTS">Sports</option>
        </select>
        <label for="mode" className="font-medium mt-3">
          Mode<span style={{ color: "red" }}>*</span>
        </label>
        <select
          name=""
          id="mode"
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          onChange={(e) => setData({ ...data, mode: e.target.value })}
        >
          <option selected="true" disabled="disabled" value="">
            Select Option
          </option>
          <option value="ONLINE">Online</option>
          <option value="OFFLINE">Offline</option>
        </select>
        <div className="delcard">
          <label className="font-medium mt-2">
            Only team leader has delegate card
          </label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => handleOnChange(e)}
          ></input>
        </div>
        <label className="font-medium mt-2">Prize</label>
        <input
          type="number"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event prize"
          onChange={(e) => setData({ ...data, prize: e.target.value })}
        />
        <label className="font-medium mt-2">Participation Criteria</label>
        <input
          type="text"
          name=""
          autoComplete="off"
          maxLength={1000}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event participation criteria"
          onChange={(e) =>
            setData({ ...data, participationCriteria: e.target.value })
          }
        />

        <label className="font-medium mt-2 w-100">
          Tags (no space in between a tag)
        </label>
        <Tag placeholder={"Tag 1"} setTag={setT1} value={t1} />
        {numTags >= 2 && (
          <Tag placeholder={"Tag 2"} setTag={setT2} value={t2} />
        )}
        {numTags >= 3 && (
          <Tag placeholder={"Tag 3"} setTag={setT3} value={t3} />
        )}
        {numTags >= 4 && (
          <Tag placeholder={"Tag 4"} setTag={setT4} value={t4} />
        )}
        {numTags !== 4 && (
          <i className="fa fa-plus-square" onClick={addTagElement}></i>
        )}
        <label className="font-medium mt-3 w-100">Event Date</label>
        <input
          type="date"
          name=""
          autoComplete="off"
          // required
          maxLength={100}
          className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Date"
          //readOnly
          onChange={(e) => setData({ ...data, eventDateTime: e.target.value })}
        />

        <label className="font-medium mt-3">Event Venue</label>
        <input
          type="text"
          name=""
          autoComplete="off"
          // required
          maxLength={100}
          className=" my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Venue"
          //readOnly
          onChange={(e) => setData({ ...data, eventVenue: e.target.value })}
        />
        <div className="font-heavy mt-4 h5">Event Head details</div>
        <div className="font-heavy mt-4 h6">Event Head 1</div>
        <label className="font-medium mt-2">
          Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head Name"
          onChange={(e) => setHead1N(e.target.value)}
        />
        <label className="font-medium mt-2">
          Phone number<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="number"
          name=""
          autoComplete="off"
          required
          maxLength={10}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head phone number"
          onChange={(e) => setHead1P(e.target.value)}
        />
        <label className="font-medium mt-2">
          Email ID<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="email"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head Email ID "
          onChange={(e) => setHead1E(e.target.value)}
        />
        {/* event head 2 */}
        <div className="font-heavy mt-4 h6">Event Head 2 (optional)</div>
        <label className="font-medium mt-2">Name</label>
        <input
          type="text"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head name"
          onChange={(e) => setHead2N(e.target.value)}
        />
        <label className="font-medium mt-2">Phone number</label>
        <input
          type="number"
          name=""
          autoComplete="off"
          required
          maxLength={10}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head phone number"
          onChange={(e) => setHead2P(e.target.value)}
        />
        <label className="font-medium mt-2">Email ID</label>
        <input
          type="email"
          name=""
          autoComplete="off"
          required
          maxLength={100}
          className="my-1 h-25 rounded mx-0 w-100 text-dark font-light"
          placeholder="Event Head Email ID"
          onChange={(e) => setHead2E(e.target.value)}
        />

        <button
          type="button"
          className="btn my-2 w-100 text-light"
          style={{ backgroundColor: "#100B1B" }}
          onClick={addEvent}
        >
          Save
        </button>
      </Modal>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="font-heavy text-light my-3 px-5 d-flex align-items-center">
          <div style={{ fontSize: "2rem" }}>{category.category}</div>
          <div
            className="text-secondary pl-3 ml-3 border-left"
            style={{ fontSize: "1.2rem" }}
          >
            {category.categoryId !== "OPR" && events.length} {category.categoryId === "OPR" && allEventDetails.length} events
          </div>
        </div>
        <div
          className="font-light border border-light rounded text-light p-2 text-center"
          style={{ width: "70%" }}
        >
          {category.description}
        </div>
        {(category.categoryId === "INF" ||
          category.categoryId === "OM" ||
          category.categoryId === "PROSHOW") && (
          <>
            <Link
              to={
                category.categoryId === "INF"
                  ? "/admin/payment/inf"
                  : category.categoryId === "OM"
                  ? "/admin/payment/om"
                  : "/admin/payment/proshow"
              }
            >
              <button
                type="button"
                className="btn m-2 text-white"
                style={{ backgroundColor: "#F4737E", width: "200px" }}
              >
                Update Payment
              </button>
            </Link>
          </>
        )}
        {(category.categoryId === "SCMIT" || category.categoryId === "VIG") && (
          <>
            {dataLoaded && (
              <div className="px-2 w-100 my-3 d-flex justify-content-center">
                <VigilanceCard data={result} isEventScan={eventScanQR} />
              </div>
            )}
            <div style={{ background: "transparent", padding: "16px" }}>
              {!dataLoaded && (
                <>
                  {scanQR && (
                    <div>
                      <QrReader
                        // constraints={{ facingMode: "environment" }}
                        delay={delay}
                        style={previewStyle}
                        onError={handleError}
                        onScan={dataLoaded == false ? handleScan : {}}
                      />
                    </div>
                  )}
                  {eventScanQR && (
                    <div>
                      <QrReader
                        // constraints={{ facingMode: "environment" }}
                        delay={delay}
                        style={previewStyle}
                        onError={handleError}
                        onScan={
                          dataLoaded == false
                            ? (d) => handleScanEvent(d, eventId)
                            : {}
                        }
                      />
                    </div>
                  )}
                </>
              )}

              {!dataLoaded && !eventScanQR && !scanQR && (
                <>
                  <button
                    className="px-4 py-1 bg-white"
                    style={{ border: 0, borderRadius: "10px" }}
                    onClick={() => {
                      setResult({});
                      setScanE(false);
                      setScan(true);
                      setdataLoaded(false);
                      setResult({});
                    }}
                  >
                    Scan
                  </button>
                </>
              )}
            </div>
            {(eventScanQR || scanQR) && (
              <center>
                {" "}
                <button
                  className="px-4 py-1 bg-white"
                  style={{ border: 0, borderRadius: "10px" }}
                  onClick={() => {
                    setScan(false);
                    setScanE(false);
                    setdataLoaded(false);
                    setResult({});
                  }}
                >
                  close
                </button>
              </center>
            )}
            <div
              className="tabs-wrapper font-medium"
              style={{ margin: "0 auto", marginTop: "2rem" }}
            >
              <div
                className={
                  eventTabSC === 0
                    ? "taeb-switch left text-center"
                    : "taeb-switch right text-center"
                }
              >
                <div
                  className={
                    eventTabSC === 0 ? "taeb active font-heavy" : "taeb"
                  }
                  taeb-direction="left"
                  onClick={() => seteventTabSC(0)}
                >
                  Sports
                </div>
                <div
                  className={
                    eventTabSC === 1 ? "taeb active font-heavy" : "taeb"
                  }
                  taeb-direction="right"
                  onClick={() => seteventTabSC(1)}
                >
                  Cultural
                </div>
              </div>
            </div>
            <div
              className="d-flex flex-wrap justify-content-center align-items-center"
              style={{ margin: "4rem 5rem" }}
            >
              {allEventDetails
                .filter((culEvent) => {
                  return eventTabSC == 0
                    ? culEvent.eventType == "SPORTS"
                    : culEvent.eventType == "CULTURAL";
                })
                .map((culEvent, ind) => {
                  return (
                    <>
                      {/* <EventDetails culEvent={culEvent}  setResult={setResult} result={result} eventScanQR={eventScanQR} setScan={setScan} dataLoaded={dataLoaded} setdataLoaded={setdataLoaded}/> */}
                      <div key={ind} className="main-wrapper font-light text-white m-1 rounded p-4">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                          {culEvent.name}
                          {/* {eventScanQR && (
                            <button onClick={() => setScan(false)}>Stop</button>
                          )} */}
                          <div
                            style={{
                              background: "transparent",
                              padding: "16px",
                            }}
                          >
                            <i
                              className="edit fa fa-qrcode"
                              aria-hidden="true"
                              style={{
                                marginRight: "1rem",
                                color: "#F4737E",
                              }}
                              onClick={() => {
                                setResult({});
                                setScan(false);
                                setScanE(true);
                                setdataLoaded(false);
                                setEventId(culEvent.eventID);
                              }}
                            ></i>
                          </div>
                          <div>
                            <a
                              href={
                                culEvent.delegateCards.length > 0
                                  ? "https://revelsmit.in/api/admin/category/event/participants/" +
                                    culEvent._id +
                                    "/" +
                                    culEvent.eventID +
                                    "/" +
                                    culEvent.name.split("/")[0] +
                                    "/" +
                                    culEvent.maxMembers +
                                    "/" +
                                    localStorage.getItem(ADMIN_TOKEN_ID) +
                                    "/" +
                                    culEvent.delegateCards[0]._id
                                  : "https://revelsmit.in/api/admin/category/event/participants/" +
                                    culEvent._id +
                                    "/" +
                                    culEvent.eventID +
                                    "/" +
                                    culEvent.name.split("/")[0] +
                                    "/" +
                                    culEvent.maxMembers +
                                    "/" +
                                    localStorage.getItem(ADMIN_TOKEN_ID) +
                                    "/none"
                              }
                            >
                              <i
                                className="edit fa fa-download"
                                aria-hidden="true"
                                style={{
                                  marginRight: "1rem",
                                  color: "#F4737E",
                                }}
                              ></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </>
        )}
        {(category.type === "CULTURAL" || category.type === "SPORTS") && (
          <>
            <button
              type="button"
              className="btn m-2 text-white"
              style={{ backgroundColor: "#F4737E", width: "200px" }}
              onClick={openModal}
            >
              Create Event
            </button>
            <div
              className="d-flex flex-wrap justify-content-center align-items-center"
              style={{ margin: "4rem 5rem" }}
            >
              {events.map((eventdata) => (
                <EventModal eventdata={eventdata} deleteEvent={deleteEvent} />
              ))}
            </div>
          </>
        )}
        {(category.categoryId === "OPR") && (
          <>
            <div
              className="d-flex flex-wrap justify-content-center align-items-center"
              style={{ margin: "4rem 5rem" }}
            >
              {allEventDetails.map((eventdata) => (
                <EventModal eventdata={eventdata} deleteEvent={deleteEvent} category={category}/>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
