import { useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// import events from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EventsCalendar.scss';
import PropTypes from 'prop-types';
import { Navigate } from 'react-big-calendar';
import TimeGrid from 'react-big-calendar/lib/TimeGrid';

const localizer = momentLocalizer(moment);

// https://medium.com/dataseries/add-a-calendar-to-a-react-app-with-react-big-calendar-7708794d89fc

function CustomWeekView({
  date,
  localizer,
  max = localizer.endOf(new Date(), 'day'),
  min = localizer.startOf(new Date(), 'day'),
  scrollToTime = localizer.startOf(new Date(), 'day'),
  ...props
}) {
  const currRange = useMemo(
    () => CustomWeekView.range(date, { localizer }),
    [date, localizer]
  );

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  );
}

CustomWeekView.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
};

CustomWeekView.range = (date, { localizer }) => {
  const start = date;
  const end = localizer.add(start, 2, 'day');

  let current = start;
  const range = [];

  while (localizer.lte(current, end, 'day')) {
    range.push(current);
    current = localizer.add(current, 1, 'day');
  }

  return range;
};

CustomWeekView.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, 'day');

    case Navigate.NEXT:
      return localizer.add(date, 3, 'day');

    default:
      return date;
  }
};

CustomWeekView.title = (date, { localizer }) => {
  const [start, ...rest] = CustomWeekView.range(date, { localizer });
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat');
};
// const CustomWeekView = () => {
//   // const { start, end } = slotInfo;
//   // const eventsForThisDay = events.filter(
//   //   (event) => event.start >= start && event.start < end
//   // );
// const events = [
//   { start: new Date(), end: new Date(), title: 'special event1' },
//   { start: new Date(), end: new Date(), title: 'special event2' },
//   {
//     start: new Date(new Date().setHours(new Date().getHours() - 3)),
//     end: new Date(new Date().setHours(new Date().getHours() + 3)),
//   },
// ];

//   return (
//     <div>
//   <Calendar
//     localizer={localizer}
//     events={events}
//     startAccessor="start"
//     endAccessor="end"
//     style={{
//       height: 500,
//       color: 'white',
//       fontWeight: 'bold',
//       height: '100vh',
//     }}
//     // onSelectSlot={(slotInfo) => {
//     //   console.log(slotInfo);
//     // }}
//     selectable
//     popup={true}
//     // eventPropGetter={eventStyleGetter}
//   />
// </div>
//   );
// };

const EventsCalendar = () => {
  const events = [
    { start: new Date(), end: new Date(), title: 'special event1' },
    { start: new Date(), end: new Date(), title: 'special event2' },
    {
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
  ];
  const { views } = useMemo(
    () => ({
      views: {
        day: true,
        month: true,
        week: CustomWeekView,
      },
      // ... other props
    }),
    []
  );
  //...
  return (
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
      // popup={true}
      // views={views}
      // eventPropGetter={eventStyleGetter}
    />
  );

  // return <Calendar views={views} events={events} />;
};

export default EventsCalendar;
