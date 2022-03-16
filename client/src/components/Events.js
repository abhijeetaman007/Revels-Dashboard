import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { TOKEN_ID } from '../utils/constants';

const Events = () => {
  const header = {
    authorization: localStorage.getItem(TOKEN_ID),
  };

  const [events, setEvents] = useState([]);
  const [eventID, setEventID] = useState(5008);
  const [teamCode, setTeamCode] = useState('');
  // function to handle register event
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
  // function to handle team creation
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
  // function to join a team by team code
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
  // function to leave a team by team code
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
  // function to fetch all events
  const getAllEvents = async () => {
    try {
      const res = await axios.get('/api/user/event/getallevents', {
        headers: header,
      });
      setEvents(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllEvents();
  }, []);
  return (
    <div>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleCreateTeam}>Create Team</button>
      <button onClick={handleJoinTeam}>Join Team</button>
      <button onClick={handleLeaveTeam}>Leave Team</button>
    </div>
  );
};

export default Events;
