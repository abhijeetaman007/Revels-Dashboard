import { useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// import events from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EventsCalendar.scss';
const localizer = momentLocalizer(moment);

// https://medium.com/dataseries/add-a-calendar-to-a-react-app-with-react-big-calendar-7708794d89fc
const CustomWeekView = () => {
  // const { start, end } = slotInfo;
  // const eventsForThisDay = events.filter(
  //   (event) => event.start >= start && event.start < end
  // );
  const events = [
    { start: new Date(), end: new Date(), title: 'special event1' },
    { start: new Date(), end: new Date(), title: 'special event2' },
    {
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 500,
          color: 'white',
          fontWeight: 'bold',
          height: '100vh',
        }}
        // onSelectSlot={(slotInfo) => {
        //   console.log(slotInfo);
        // }}
        selectable
        popup={true}
        // eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

const EventsCalendar = () => {
  const { views, ...otherProps } = useMemo(
    () => ({
      views: {
        month: true,
        week: CustomWeekView,
        day: true,
      },
      // ... other props
    }),
    []
  );
  //...

  return <Calendar views={views} {...otherProps} />;
};

export default EventsCalendar;
