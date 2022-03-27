import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import EventTile from '../components/EventTile.js/EventTile';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { ADMIN_TOKEN_ID } from '../../../utils/constants';

const Dashboard = () => {
  const auth = useAuth();
  const header = {
    authorization: localStorage.getItem(ADMIN_TOKEN_ID),
  };
  const [category, setCategory] = useState({});
  const [events, setEvents] = useState([]);
  const AdminLogout = () => {
    auth.adminLogout();
    console.log('logout');
    // reload window
    window.location.reload();
  };
  const getEvents = async () => {
    try {
      const res = await axios.get('/api/admin/category/event/getevents', {
        headers: header,
      });
      console.log(res);
      setEvents(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getCategory = async () => {
    try {
      const res = await axios.get('/api/admin/category', {
        headers: header,
      });
      console.log(res);
      setCategory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const addEvent = async () => {
    // try {
    //   const res = axios.post(
    //     '/api/admin/category/event/addevent',
    //     {
    //       name,
    //       description,
    //       eventType,
    //       mode,
    //       participationCriteria,
    //       prize,
    //       minMembers,
    //       maxMembers,
    //       eventHeads,
    //       delegateCards, //List of all needed delegate card IDs
    //       //   eventDateTime, (To be set by operations)
    //       //   eventVenue,
    //       tags,
    //       teamDelegateCardWorks,
    //     },
    //     {
    //       headers: header,
    //     }
    //   );
    // } catch (err) {
    //   console.log(err);
    // }
  };
  useEffect(() => {
    getCategory();
    getEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <button onClick={AdminLogout}>Logout</button>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="font-heavy text-light my-3 d-flex align-items-center">
          <div style={{ fontSize: '2rem' }}>{category.category}</div>
          <div
            className="text-secondary pl-3 ml-3 border-left"
            style={{ fontSize: '1.2rem' }}
          >
            {events.length} events
          </div>
        </div>
        <div
          className="font-light border border-light rounded text-light p-2 text-center"
          style={{ width: '70%' }}
        >
          {category.description}
        </div>
        <div className="text-light mt-3 d-flex flex-column flex-md-row align-items-center justify-content-center">
          <input
            type="text"
            name=""
            autoComplete="off"
            maxLength={100}
            className="rounded p-2 mb-0"
            placeholder="Edit category description"
            style={{ width: '300px', backgroundColor: 'white', color: 'black' }}
          />
          <button
            type="button"
            className="btn m-2 text-white"
            style={{ backgroundColor: '#000' }}
          >
            Save
          </button>
        </div>

        <button
          type="button"
          className="btn m-2 text-white"
          style={{ backgroundColor: '#F4737E', width: '200px' }}
          onClick={addEvent}
        >
          Add Event
        </button>
        <div className="d-flex flex-wrap" style={{ margin: '4rem 5rem' }}>
          <EventTile events={events} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
