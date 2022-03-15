import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../pages/Layout/Layout';
import axios from 'axios';
const InsideEvent = () => {
  const { eventid } = useParams();
  const [event, setEvent] = React.useState({});
  const callEventByID = async () => {
    const res = await axios.get('/api/user/getevent/' + eventid);
    console.log(res.data.data);
    setEvent(res.data.data);
  };
  useEffect(() => {
    callEventByID();
  }, []);

  return (
    <Layout activeTab={'events'}>
      <div>{event.eventType}</div>
      <div>
        {event.minMembers}-{event.maxMembers}
      </div>
      <div>{event.mode}</div>
      <button>Create Team</button>
      <button>Join Team</button>
    </Layout>
  );
};

export default InsideEvent;
