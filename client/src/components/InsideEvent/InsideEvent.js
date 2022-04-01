import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TOKEN_ID } from '../../utils/constants';
import { useParams } from 'react-router-dom';
import Layout from '../../pages/Layout/Layout';
import Modal from 'react-modal';
import axios from 'axios';
import moment from 'moment';
import './InsideEvent.scss';
import { useAuth } from '../../context/AuthContext';
const customStyles = {
  content: {
    backgroundColor: '#100b1b',
    border: 0,
    borderRadius: '10px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
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
  const [teamIDInput, setTeamIDInput] = useState('');
  const [teamCreator, setTeamCreator] = useState('');

  //MODAL STUFF
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }
  // function to get event by ID
  const callEventByID = async () => {
    try {
      const res = await axios.post(
        '/api/user/event/getbyid',
        { event_Id: eventID },
        { headers: header }
      );
      console.log('event now');
      console.log(res.data.data);
      setEvent(res.data.data);
      setEventID(res.data.eventID);
    } catch (err) {
      console.log(err);
    }
  };
  // function to get team details
  const getTeamDetails = async () => {
    try {
      console.log('get team details');
      const res = await axios.post(
        '/api/user/team/get',
        { event_ID: eventID },
        { headers: header }
      );
      console.log('====================================');
      console.log('team', res.data.data);
      console.log('====================================');
      setTeam(res.data.data);
      setRequests(res.data.data.requestedMembers);
      setTeammembers(res.data.data.members);
      setTeamCreator(res.data.data.createdBy);

      console.log('teamid', res.data.data.teamID);

      console.log('teamcreateby', res.data.data.createdBy);
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
    try {
      console.log(teamIDInput);
      const res = await axios.post(
        '/api/user/team/join',
        { eventID: event.eventID, teamID: teamIDInput },
        { headers: header }
      );
      console.log('ress1', res);
      console.log('tooast');
      toast.success(res.data.msg);
    } catch (err) {
      console.log(err);
    }
  };
  // function to register as individual
  const registerIndividual = async () => {
    try {
      const res = await axios.post(
        '/api/user/event/register',
        { eventID: event.eventID },
        { headers: header }
      );
      console.log('ress2', res);
      if (res.data.success) {
        toast.success(res.data.msg);
        window.location.reload(false);
      } else toast.error(res.data.msg);
    } catch (err) {
      console.log(err);
    }
  };
  // function to handle leave team
  const leaveTeam = async () => {
    try {
      const res = await axios.post(
        '/api/user/team/leave',
        { teamID: team.teamID },
        { headers: header }
      );
      console.log('ress4', res);
      if (res.data.success) {
        toast.success(res.data.msg);
        window.location.reload(false);
      } else toast.error(res.data.msg);
    } catch (err) {
      console.log(err);
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
    <Layout activeTab={'events'} isAagazVisible={true}>
      <div className="event-details">
        <div className="cat-event">
          <img
            className="category-logo"
            src="https://qph.fs.quoracdn.net/main-qimg-a5b5639f84c719c9d7a861a1cf7d62aa-lq"
          ></img>
          <div className="name-type">
            <p className="font-heavy">{event.eventType} </p>
            <p className="font-light">{event.name}</p>
          </div>
        </div>
        <div className="event-group ele">
          {DataComponent({
            icon: 'fa-users',
            heading: 'Team Size',
            text:
              event.minMembers === event.maxMembers
                ? 'Individual event'
                : `${event.minMembers} - ${event.maxMembers}`,
          })}
          {DataComponent({
            icon: 'fa-calendar-o',
            heading: 'Event Date',
            text: `${new Date(event.eventDateTime).getDate()}/
            ${new Date(event.eventDateTime).getMonth()}/
            ${new Date(event.eventDateTime).getFullYear()}`,
          })}
          {DataComponent({
            icon: 'fa-map-marker',
            heading: 'Event Venue',
            text: `${event.eventVenue}`,
          })}
          {DataComponent({
            icon: 'fa-calendar-check-o',
            heading: 'Registration Deadline',
            text: `${new Date(event.registrationDeadline).getDate()}/
            ${new Date(event.registrationDeadline).getMonth()}/
            ${new Date(event.registrationDeadline).getFullYear()}`,
          })}
        </div>
        <div className="ele font-light">{event.description}</div>
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
                <button onClick={registerIndividual}>Join Individually</button>
              </div>
            )}
            {event.maxMembers > 1 && (
              <div className="reg-area">
                <button
                  className="font-heavy create"
                  onClick={registerIndividual}
                >
                  Create new team
                </button>
                <div
                  className="w-100 my-4"
                  style={{ backgroundColor: 'grey', height: 0.5 }}
                ></div>
                <input
                  className="input-team w-100"
                  type="text"
                  onChange={(e) => {
                    setTeamIDInput(e.target.value);
                  }}
                  style={{ color: 'white' }}
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
          <button onClick={openModal} className="font-heavy">
            Register
          </button>
        ) : (
          <div>
            <div className="event-group">
              {DataComponent({
                icon: 'fa-info-circle',
                heading: 'Team ID',
                text: team.teamID,
              })}
              <div className="event-data">
                <div className="d-flex align-items-center">
                  <i className="fa fa-users mr-1"></i>
                  <p className="font-heavy ml-1 pt-1">Team Members</p>
                </div>
                <div className="font-light d-flex">
                  {teammembers.length != 0
                    ? teammembers.map((member, index) => (
                        <span className="font-light">
                          {auth.user._id == teamCreator && (
                            <span>
                              <i className="fa fa-star mr-1"></i>
                            </span>
                          )}
                          {member.user.name}
                          {index !== teammembers.length - 1 && ','}
                        </span>
                      ))
                    : null}
                </div>
              </div>
            </div>
            {auth.user._id == teamCreator ? (
              <div className="ele">
                <div className="font-heavy">REQUESTS</div>
                {requests.length != 0 ? (
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
                              '/api/user/team/add',
                              {
                                eventID: event.eventID,
                                teamID: team.teamID,
                                user_ID: x._id,
                              },
                              {
                                headers: header,
                              }
                            );
                            console.log('ress3', res);
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
                              '/api/user/team/deleterequest',
                              {
                                teamID: team.teamID,
                                user_ID: x._id,
                              },
                              {
                                headers: header,
                              }
                            );
                            console.log('ress3', res);
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
                  <div className="font-light">No requests so far...</div>
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
