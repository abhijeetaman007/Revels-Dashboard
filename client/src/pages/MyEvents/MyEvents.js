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
                const res = await axios.get('/api/user/event/getevents', {
                    headers: {
                        authorization: token,
                    },
                });
                console.log('====================================');
                console.log('myevents', res);
                console.log('====================================');
                setEvents(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getRegEvents();
    }, []);
    return (
        <Layout activeTab='my-events'>
            {events.map((eventData, index) => {
                return <EventCard data={eventData.event} key={index} />;
            })}
        </Layout>
    );
};

export default MyEvents;
