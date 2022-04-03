import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TOKEN_ID } from "../../utils/constants";
import { useParams } from "react-router-dom";
import Layout from "../../pages/Layout/Layout";
import Modal from "react-modal";
import axios from "axios";
import "./InsideEvent.scss";
import { useAuth } from "../../context/AuthContext";
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
const InsideEvent = () => {
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
  //MODAL STUFF
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
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
      console.log(res.data.data);
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
      console.log(res.data.data.members);
      setTeammembers(res.data.data.members);
      console.log("here ", res.data.data.createdBy);
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
  return (
    <Layout activeTab={"events"} isAagazVisible={true}>
      <div className="event-details">
        <div className="cat-event">
          {/* <img
            className="category-logo"
            alt="category-logo"
            src="https://qph.fs.quoracdn.net/main-qimg-a5b5639f84c719c9d7a861a1cf7d62aa-lq"
          ></img> */}
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
                text: `${new Date(event.registrationDeadline).getDate()}/
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
                      return del.name;
                    })}`,
                  })}
                </>
              )}
            </>
          )}
        </div>
        <div className="ele font-light">{event.description}</div>
        <br />
        {event.delegateCards.length > 0 ? (
          <p className="ele font-heavy" style={{ fontSize: "1.5rem" }}>
            {" "}
            Required Delegate Cards
          </p>
        ) : (
          <p className="ele font-light" style={{ fontSize: "1.5rem" }}>
            {" "}
            : No Delegate Card Required
          </p>
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
            {event.maxMembers === 1 && (
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
            )}
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
          <button disabled onClick={openModal} className="font-heavy">
            Register
          </button>
        ) : (
          <div>
            <div className="event-group">
              {DataComponent({
                icon: "fa-info-circle",
                heading: "Team ID",
                text: team.teamID,
              })}
              <div className="event-data">
                <div className="d-flex align-items-center">
                  <i className="fa fa-users mr-1"></i>
                  <p className="font-heavy ml-1 pt-1">Team Members</p>
                </div>
                <div className="font-light d-flex">
                  {teammembers.length !== 0
                    ? teammembers.map((member, index) => (
                        <span className="font-light">
                          {member.user._id === teamCreator && (
                            <span>
                              <i className="fa fa-star mr-1"></i>
                            </span>
                          )}
                          {member.user.name}
                          {index !== teammembers.length - 1 && ", "}
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
                    <div>
                      {x.name}
                      <button
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
                            console.log("ress3", res);
                            if (res.data.success) {
                              toast.success(res.data.msg);
                              window.location.reload(false);
                            } else {
                              toast.error(res.data.msg);
                            }
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        Add To team
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
                        Remove Request
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
    </Layout>
  );
};

export default InsideEvent;
