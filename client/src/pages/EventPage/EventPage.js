import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../../components/EventCard/EventCard';
import Layout from '../Layout/Layout';

const Events = () => {
  const [events, setEvents] = useState([]);
  const getAllEvents = async () => {
    try {
      const res = await axios.get('/api/user/event/getallevents');
      setEvents(res.data.data);
      console.log(events);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <Layout activeTab="events">
      <div
        className="events-wrapper"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          height: 'fit-content',
        }}
      >
        {events.length > 0
          ? events.map((eventData, index) => {
              return <EventCard key={index} data={eventData} />;
            })
          : 'Loader'}
      </div>
    </Layout>
  );
};

export default Events;
