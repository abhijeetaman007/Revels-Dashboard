import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TOKEN_ID } from '../../utils/constants';
import { useParams } from 'react-router-dom';
import Layout from '../../pages/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import './InsideEvent.scss';
const InsideEvent = () => {
  const header = {
    authorization: localStorage.getItem(TOKEN_ID),
  };
  const { eventid } = useParams();
  // const [events, setEvents] = useState([]);
  const [eventID, setEventID] = useState(eventid);
  const [teamCode, setTeamCode] = useState('');
  const handleCreateTeam = async () => {
    const toastId = toast.loading('Loading...');
    if (!isNaN(eventID)) {
      try {
        const res = await axios.post(
          '/api/user/team/register',
          { eventID: eventID },
          { headers: header }
        );
        if (res.data.success) {
          toast.success(res.data.msg, {
            position: 'bottom-center',
            id: toastId,
          });
        } else {
          toast.error(res.data.msg[0][Object.keys(res.msg[0])[0]], {
            position: 'bottom-center',
            id: toastId,
          });
        }
      } catch (error) {
        toast.error(error.response.data.msg, {
          position: 'bottom-center',
          id: toastId,
        });
      }
    }
  };
  const handleRegister = async () => {
    const toastId = toast.loading('Loading...');
    if (!isNaN(eventID)) {
      try {
        const res = await axios.post(
          '/api/user/event/register',
          { eventID: eventID },
          { headers: header }
        );
        if (res.data.success) {
          toast.success(res.data.msg, {
            position: 'bottom-center',
            id: toastId,
          });
        } else {
          toast.error(res.data.msg[0][Object.keys(res.msg[0])[0]], {
            position: 'bottom-center',
            id: toastId,
          });
        }
      } catch (error) {
        toast.error(error.response.data.msg, {
          position: 'bottom-center',
          id: toastId,
        });
      }
    }
  };
  const handleJoinTeam = async () => {
    const toastId = toast.loading('Loading...');
    if (!isNaN(eventID)) {
      if (teamCode !== '') {
        try {
          const res = await axios.post(
            '/api/user/team/jointeam',
            {
              eventID: eventID,
              inputTeamCode: teamCode,
            },
            { headers: header }
          );
          if (res.data.success) {
            toast.success(res.data.msg, {
              position: 'bottom-center',
              id: toastId,
            });
          }
        } catch (error) {
          toast.error(error.response.data.msg, {
            position: 'bottom-center',
            id: toastId,
          });
        }
      } else {
        toast.error('Team code cannot be empty', {
          position: 'bottom-center',
          id: toastId,
        });
      }
    }
  };
  const handleLeaveTeam = async () => {
    const toastId = toast.loading('Loading...');
    if (teamCode !== '') {
      try {
        const res = await axios.post(
          '/api/user/team/leaveteam',
          {
            teamID: teamCode,
          },
          { headers: header }
        );
        if (res.data.success) {
          toast.success(res.data.msg, {
            position: 'bottom-center',
            id: toastId,
          });
        }
      } catch (error) {
        toast.error(error.response.data.msg, {
          position: 'bottom-center',
          id: toastId,
        });
      }
    }
  };
  const [event, setEvent] = React.useState({});
  const formatDate = (str) => {
    // var str = '2011-04-11T10:20:30Z';
    var date = moment(str);
    var dateComponent = date.utc().format('DD-MM-YY');
    var timeComponent = date.utc().format('HH:mm');
    return dateComponent + ' , ' + timeComponent;
  };
  const callEventByID = async () => {
    const res = await axios.get('/api/user/getevent/' + eventid);
    console.log(res.data.data);
    setEvent(res.data.data);
  };
  useEffect(() => {
    callEventByID();
  }, []);
  const createTeam = () => {
    console.log('!');
  };
  const joinTeam = () => {
    console.log('!');
  };
  return (
    <Layout activeTab={'events'}>
      <div className="event-details">
        <div className="ele">
          <p className="font-heavy">{event.eventType}</p>
          <p className="font-light">{event.name}</p>
        </div>
        <div className="event-grp ele">
          <div className="compo">
            <p className="font-heavy">Team Size</p>
            <p className="font-light">
              {event.minMembers}&nbsp;-&nbsp;{event.maxMembers}
            </p>
          </div>
          <div className="compo">
            <p className="font-heavy">Date</p>
            <p className="font-light">{formatDate(event.eventDateTime)}</p>
          </div>
          <div className="compo ">
            <p className="font-heavy">Venue</p>
            <p className="font-light">{event.eventVenue}</p>
          </div>
        </div>
        <div className="ele font-light">{event.description}</div>
        <div className="ele">
          <button onClick={handleCreateTeam}>Create Team</button>
          <button onClick={joinTeam}>Join Team</button>
        </div>
        <div className="ele">
          <div className="font-heavy">Team ID</div>
          <div className="split">
            <div>1223</div>
            <button className="font-heavy blueinwhite">Leave Team</button>
          </div>
        </div>
        <div className="ele">
          <div className="font-heavy">Team Members</div>
          <div className="split">
            <div>Rhea Adhikari</div>
          </div>
        </div>
        <div className="ele">
          <div className="font-heavy">Add to team</div>
          <div className="split">
            <input
              type="text"
              placeholder="Enter Delegate ID"
              className="input-team"
            ></input>
            <button className="font-heavy whiteinblue">Invite</button>
          </div>
        </div>
        <div className="ele">
          <div className="font-heavy">Join Team</div>
          <div className="split">
            <input
              type="text"
              placeholder="Enter Team Code"
              className="input-team"
            ></input>
            <button className="font-heavy blueinwhite">Join</button>
            <button className="font-heavy blackingrey">Cancel</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InsideEvent;
