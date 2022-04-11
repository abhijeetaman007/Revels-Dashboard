import React, { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { TOKEN_ID } from "../../utils/constants";
import { Link, useParams } from "react-router-dom";
import Layout from "../../pages/Layout/Layout";
import Modal from "react-modal";
import axios from "axios";
import "./InsideEvent.scss";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../pages/Loader/Loader";
import Navbar from "../Navbar/Navbar";
const customStyles = {
  content: {
    backgroundColor: "#100b1b",
    border: 0,
    borderRadius: "10px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// handles hamburger click on mobiles
const handleHamburger = () => {
  document.querySelector(".dash-wrapper").classList.toggle("active");
};
const InsideEvent = ({ isPublic }) => {
  const auth = useAuth();
  const header = {
    authorization: localStorage.getItem(TOKEN_ID),
  };
  const { eventid } = useParams();
  const [eventID, setEventID] = useState(eventid);
  const [event, setEvent] = useState({});
  const [requests, setRequests] = useState([]);
  const [team, setTeam] = useState(null);
  const [teammembers, setTeammembers] = useState([]);
  const [teamIDInput, setTeamIDInput] = useState("");
  const [teamCreator, setTeamCreator] = useState("");
  const [loading, setloading] = useState(true);
  //MODAL STUFF
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setIsOpen(false);
  }
  // function to get event by ID
  const callEventByID = async () => {
    try {
      const res = await axios.post(
        "/api/user/event/getbyid",
        { event_Id: eventid },
        { headers: header }
      );
      setEvent(res.data.data);
      setloading(false);
      setEventID(res.data.eventid);
    } catch (err) {
      console.log(err);
    }
  };
  // function to get team details
  const getTeamDetails = async () => {
    try {
      const res = await axios.post(
        "/api/user/team/get",
        { event_ID: eventID },
        { headers: header }
      );
      setTeam(res.data.data);
      setRequests(res.data.data.requestedMembers);
      setTeammembers(res.data.data.members);
      setTeamCreator(res.data.data.createdBy);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTeamDetails();
    callEventByID();
  }, []);
  // function to handle join team
  const joinTeam = async () => {
    const toastId = toast.loading("Joining Team");

    try {
      const res = await axios.post(
        "/api/user/team/join",
        { eventID: event.eventID, teamID: teamIDInput },
        { headers: header }
      );

      toast.success(res.data.msg, {
        position: "bottom-center",
        id: toastId,
      });
      setIsOpen(false);
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: "bottom-center",
        id: toastId,
      });
    }
  };
  // function to register as individual
  const registerIndividual = async () => {
    const toastId = toast.loading("Creating Team");
    try {
      const res = await axios.post(
        "/api/user/event/register",
        { eventID: event.eventID },
        { headers: header }
      );

      if (res.data.success) {
        toast.success(res.data.msg, {
          position: "bottom-center",
          id: toastId,
        });
        setIsOpen(false);
        setTimeout(() => window.location.reload(), 2000);
        //window.location.reload(false);
      } else {
        toast.error(res.data.msg, {
          position: "bottom-center",
          id: toastId,
        });
      }
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: "bottom-center",
        id: toastId,
      });
    }
  };
  const copyTextFunc = (id) => {
    copy(id);
    toast.success("Copied to clipboard");
  };
  // function to handle leave team
  const leaveTeam = async () => {
    const toastId = toast.loading("Leaving Team");
    try {
      const res = await axios.post(
        "/api/user/team/leave",
        { teamID: team.teamID },
        { headers: header }
      );

      if (res.data.success) {
        toast.success(res.data.msg, {
          position: "bottom-center",
          id: toastId,
        });
        setTimeout(() => window.location.reload(), 2000);
      } else {
        toast.error(res.data.msg, {
          position: "bottom-center",
          id: toastId,
        });
      }
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: "bottom-center",
        id: toastId,
      });
    }
  };
  // component to render event details
  const DataComponent = ({ icon, heading, text }) => {
    return (
      <div className="event-data">
        <div className="d-flex align-items-center">
          <i className={`fa ${icon} mr-1`}></i>
          <p className="ml-1 grey small-font">{heading}</p>
        </div>
        <p className="font-light">{text}</p>
      </div>
    );
  };
  const InsideEventDetails = () => {
    return (
      <div className={`event-details ${isPublic && "public-details"}`}>
        <div className="back-events w-100 d-flex align-items-center">
          <i className="fa fa-angle-left fa-2x mr-2 my-4"></i>
          <Link to={isPublic ? "/events" : "/dashboard/events"}>
            Back to events
          </Link>
        </div>
        <div className="cat-event">
          <div className="name-type">
            <p className="font-heavy">{event.eventType} </p>
            <p className="font-light">{event.name}</p>
          </div>
        </div>
        <div className="event-group ele">
          {DataComponent({
            icon: "fa-users",
            heading: "Team Size",
            text:
              event.minMembers === event.maxMembers
                ? event.minMembers === 1
                  ? "Individual event"
                  : event.minMembers
                : `${event.minMembers} - ${event.maxMembers}`,
          })}
          {event.eventDateTime && (
            <>
              {DataComponent({
                icon: "fa-calendar-o",
                heading: "Event Date",
                text: `${new Date(event.eventDateTime).getDate()}/
            ${new Date(event.eventDateTime).getMonth() + 1}/
            ${new Date(event.eventDateTime).getFullYear()}`,
              })}
            </>
          )}
          {event.eventVenue && (
            <>
              {DataComponent({
                icon: "fa-map-marker",
                heading: "Event Venue",
                text: `${event.eventVenue}`,
              })}
            </>
          )}
          {event.registrationDeadline && (
            <>
              {DataComponent({
                icon: "fa-calendar-check-o",
                heading: "Registration Deadline",
                text: `${new Date(event.registrationDeadline).getDate()}/
            ${new Date(event.registrationDeadline).getMonth() + 1}/
            ${new Date(event.registrationDeadline).getFullYear()}`,
              })}
            </>
          )}
        </div>
        <div className="ele font-light">{event.description}</div>
        <br />
        {event.delegateCards.length > 0 ? (
          <p className="ele font-heavy" style={{ fontSize: "1.5rem" }}>
            {" "}
            <i className={`fa fa-ticket mr-1`}></i> Required Delegate Cards
          </p>
        ) : (
          // check if delegateteamcard required by only team leader
          <p className="ele font-light" style={{ fontSize: "1.5rem" }}>
            {" "}
            <span>
              <i className="fa fa-ticket mr-2"></i>
            </span>
            No Delegate Card Required
          </p>
        )}
        {event.delegateCards.length > 0 ? (
          event.teamDelegateCard ? (
            <p style={{ fontSize: "small", color: "red" }}>
              Team Delegate Cards required to be purchased only by team leader.
            </p>
          ) : (
            <p style={{ fontSize: "small", color: "red" }}>
              All members need to purchase the required delegate cards.
            </p>
          )
        ) : (
          <></>
        )}
        <ul>
          {event.delegateCards.map((delegateCard) => (
            <li className="ele font-light" style={{ fontSize: "1.2rem" }}>
              &nbsp; ◦ {delegateCard.name}
            </li>
          ))}
        </ul>
        {/* POPUP FOR REGISTER */}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Register Modal"
        >
          <div className="reg-modal-content">
            <div className="close-bar">
              <p className="font-medium">{event.name}</p>
              <i className="fa fa-close ml-auto" onClick={closeModal}></i>
            </div>
            {
              <div className="reg-area">
                <div className="event-group ele text-white">
                  {DataComponent({
                    icon: "fa-users",
                    heading: "Team Size",
                    text:
                      event.minMembers === event.maxMembers
                        ? event.maxMembers == 1
                          ? "Individual event"
                          : event.maxMembers
                        : `${event.minMembers} - ${event.maxMembers}`,
                  })}
                  {event.eventDateTime && (
                    <>
                      {DataComponent({
                        icon: "fa-calendar-o",
                        heading: "Event Date",
                        text: `${new Date(event.eventDateTime).getDate()}/
                    ${new Date(event.eventDateTime).getMonth() + 1}/
                    ${new Date(event.eventDateTime).getFullYear()}`,
                      })}
                    </>
                  )}
                  {event.eventVenue && (
                    <>
                      {DataComponent({
                        icon: "fa-map-marker",
                        heading: "Event Venue",
                        text: `${event.eventVenue}`,
                      })}
                    </>
                  )}
                  {event.registrationDeadline && (
                    <>
                      {DataComponent({
                        icon: "fa-calendar-check-o",
                        heading: "Registration Deadline",
                        text: `${new Date(
                          event.registrationDeadline
                        ).getDate()}/
                    ${new Date(event.registrationDeadline).getMonth() + 1}/
                    ${new Date(event.registrationDeadline).getFullYear()}`,
                      })}
                    </>
                  )}
                  {event.delegateCards && (
                    <>
                      {event.delegateCards.length > 1 && (
                        <>
                          {DataComponent({
                            icon: "fa-ticket",
                            heading: "Delegate Cards Required",
                            text: `${event.delegateCards.map((del, index) => {
                              return +del.name;
                            })}`,
                          })}
                        </>
                      )}
                    </>
                  )}
                </div>
                <button onClick={registerIndividual}>Join Individually</button>
              </div>
            }
            {event.maxMembers > 1 && (
              <div className="reg-area">
                <div className="event-group ele text-white">
                  {DataComponent({
                    icon: "fa-users",
                    heading: "Team Size",
                    text:
                      event.minMembers === event.maxMembers
                        ? "Individual event"
                        : `${event.minMembers} - ${event.maxMembers}`,
                  })}
                  {event.eventDateTime && (
                    <>
                      {DataComponent({
                        icon: "fa-calendar-o",
                        heading: "Event Date",
                        text: `${new Date(event.eventDateTime).getDate()}/
                    ${new Date(event.eventDateTime).getMonth() + 1}/
                    ${new Date(event.eventDateTime).getFullYear()}`,
                      })}
                    </>
                  )}

                  {event.eventVenue && (
                    <>
                      {DataComponent({
                        icon: "fa-map-marker",
                        heading: "Event Venue",
                        text: `${event.eventVenue}`,
                      })}
                    </>
                  )}
                  {event.registrationDeadline && (
                    <>
                      {DataComponent({
                        icon: "fa-calendar-check-o",
                        heading: "Registration Deadline",
                        text: `${new Date(
                          event.registrationDeadline
                        ).getDate()}/
                    ${new Date(event.registrationDeadline).getMonth() + 1}/
                    ${new Date(event.registrationDeadline).getFullYear()}`,
                      })}
                    </>
                  )}
                  {event.delegateCards.length > 1 && (
                    <>
                      {DataComponent({
                        icon: "fa-ticket",
                        heading: "Delegate Cards Required",
                        text: `${event.delegateCards.map((del, index) => {
                          return del.name;
                        })}`,
                      })}
                    </>
                  )}
                </div>
                <button
                  className="font-heavy create"
                  onClick={registerIndividual}
                >
                  Create new team
                </button>
                <div
                  className="w-100 my-4"
                  style={{ backgroundColor: "grey", height: 0.5 }}
                ></div>
                <input
                  className="input-team w-100"
                  type="text"
                  onChange={(e) => {
                    setTeamIDInput(e.target.value);
                  }}
                  value={teamIDInput}
                  style={{ color: "white" }}
                  placeholder="Team ID"
                />
                <button className="font-heavy" onClick={joinTeam}>
                  Request to join team
                </button>
              </div>
            )}
            <div className="team-reg"></div>
          </div>
        </Modal>
        {team === null ? (
          isPublic ? (
            <Link to="/login">
              <button className="font-heavy">Login to Register</button>
            </Link>
          ) : (
            <>
              {event.isActive ? (
                <button onClick={openModal} className="font-heavy">
                  Register
                </button>
              ) : (
                <button className="font-heavy" disabled={true}>
                  Registration Closed
                </button>
              )}
            </>
          )
        ) : (
          <div>
            <div className="event-group">
              <div className="event-data">
                <div className="d-flex align-items-center">
                  <i className="fa fa-info-circle mr-1"></i>
                  <p className="ml-1 grey small-font">Team ID</p>
                </div>
                <p className="font-light">
                  {team.teamID}
                  <span>
                    <i
                      className="fa fa-copy mx-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => copyTextFunc(team.teamID)}
                    ></i>
                  </span>
                </p>
              </div>
              <div className="event-data">
                <div className="d-flex align-items-center">
                  <i className="fa fa-users mr-1"></i>
                  <p className="ml-1 grey small-font">Team Members</p>
                </div>
                <p>
                  {/* if team members length is less than minimum  */}
                  {team.members.length < event.minMembers && (
                    <p className="font-light text-muted ml-auto">
                      &nbsp;{event.minMembers - team.members.length} more
                      required in team
                    </p>
                  )}
                </p>
                <div className="font-light d-flex">
                  {teammembers.length !== 0
                    ? teammembers.map((member, index) => (
                        <span className="font-light mr-1">
                          {member.user._id === teamCreator && (
                            <span>
                              <i className="fa fa-star mr-1"></i>
                            </span>
                          )}
                          {member.user.name}
                          {index !== teammembers.length - 1 && ","}
                        </span>
                      ))
                    : null}
                </div>
              </div>
            </div>
            {auth.user._id === teamCreator && event.maxMembers !== 1 ? (
              <div className="ele">
                <div className="font-heavy">REQUESTS</div>
                {requests.length !== 0 ? (
                  requests.map((x, idx) => (
                    <div className="font-medium d-flex align-items-center">
                      <p className="mr-2">{x.name}</p>
                      <button
                        className="mr-2"
                        onClick={async () => {
                          try {
                            console.log({
                              eventID: event.eventID,
                              teamID: team.teamID,
                              user_ID: x._id,
                            });
                            const res = await axios.post(
                              "/api/user/team/add",
                              {
                                eventID: event.eventID,
                                teamID: team.teamID,
                                user_ID: x._id,
                              },
                              {
                                headers: header,
                              }
                            );
                            if (res.data.success) {
                              toast.success(res.data.msg);
                              window.location.reload(false);
                            } else {
                              console.log("hakuan");
                              toast.error(res.data.msg);
                            }
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        <i className="fa fa-check"></i>
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            console.log({
                              teamID: team.teamID,
                              user_ID: x._id,
                            });
                            const res = await axios.post(
                              "/api/user/team/deleterequest",
                              {
                                teamID: team.teamID,
                                user_ID: x._id,
                              },
                              {
                                headers: header,
                              }
                            );
                            console.log("ress3", res);
                            if (res.data.success) {
                              toast.success(res.data.msg);
                              window.location.reload(false);
                            } else toast.error(res.data.msg);
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="font-light">
                    <span>
                      <i className="fa fa-exclamation-triangle text-danger mr-2"></i>
                    </span>
                    No requests so far...
                  </div>
                )}
              </div>
            ) : null}
            <button className="font-heavy border-box" onClick={leaveTeam}>
              Leave Team
            </button>
          </div>
        )}
      </div>
    );
  };
  if (loading) return <Loader />;
  return isPublic ? (
    <div>
      <Navbar />
      <InsideEventDetails />
    </div>
  ) : (
    <Layout activeTab="events" isAagazVisible={true}>
      <InsideEventDetails />
    </Layout>
  );
};

export default InsideEvent;
