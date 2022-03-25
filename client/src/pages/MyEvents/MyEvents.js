import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import EventCard from './../../components/EventCard/EventCard';
import { TOKEN_ID } from '../../utils/constants';

const MyEvents = () => {
  const token = localStorage.getItem(TOKEN_ID);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getRegEvents = async () => {
      try {
        console.log('getttt');
        const res = await axios.get('/api/user/event/getevents', {
          headers: {
            authorization: token,
          },
        });
        console.log('myyy', res.data.data);
        setEvents(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRegEvents();
  }, []);
  return (
    <Layout activeTab="my-events">
      <div
        className="events-wrapper"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          height: 'fit-content',
        }}
      >
        {events != undefined ? (
          events.map((eventData, index) => {
            return <EventCard data={eventData.event} key={index} />;
          })
        ) : (
          <div className="font-heavy">
            You have not been registered into any team yet
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyEvents;
