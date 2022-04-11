import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EventsCalendar.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const localizer = momentLocalizer(moment);
const EventsCalendar = () => {
  const [events, setEvents] = useState();
  useEffect(() => {
    const getAllEvents = async () => {
      const res = await axios.get("/api/user/event/getallevents");
      setEvents(res.data.data);
      console.log(events)
      let filtered = events.filter((eve) => {
        return (new Date(eve.eventDateTime).getDate() === new Date().getDate())
      })
      console.log(filtered)
    }
    getAllEvents();
  }, []);  
  const eventDetails = [
    { start: new Date("10 April 2022, 13:00:00"), 
      // end: new Date("10 April 2022, 14:30:00"), 
      title: 'special event1' },
    { start: new Date("10 April 2022, 13:30:00"), 
      // end: new Date("10 April 2022, 15:30:00"), 
      title: 'special event2' },
    { start: new Date("10 April 2022, 15:00:00"), 
      // end: new Date("10 April 2022, 16:30:00"), 
      title: 'special event3' },
  ];
  return (
    <div className="calendar-wrapper">
      {/* <Navbar isBackground={true}/> */}
      <Calendar
        localizer={localizer}
        events={eventDetails}
        defaultView="day"
        startAccessor="start"
        endAccessor="end"
        className="font-medium"
        style={{
          color: 'white',
          height: '100vh',
        }}
      />
    </div>
  );
};

export default EventsCalendar;
