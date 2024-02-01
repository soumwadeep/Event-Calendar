import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Modal from "../components/Modal";

const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    id: 1,
    title: "Short Event",
    start: new Date(2024, 0, 31, 9, 0), // Year, Month (0-based), Day, Hour, Minute
    end: new Date(2024, 0, 31, 10, 0),
    type: "short-event",
    goto: "/CreateEvent",
  },
  {
    id: 2,
    title: "Full Day Event",
    start: new Date(2024, 0, 31),
    end: new Date(2024, 0, 31),
    type: "full-day-event",
    goto: "/CreateEvent2",
  },
  {
    id: 3,
    title: "Multi-Day Event",
    start: new Date(2024, 0, 31),
    end: new Date(2024, 1, 7),
    type: "multi-day-event",
    goto: "/CreateEvent",
  },
  {
    id: 4,
    title: "Overlapping Event 1",
    start: new Date(2024, 0, 31, 11, 0),
    end: new Date(2024, 0, 31, 12, 0),
    type: "short-event",
    goto: "/CreateEvent",
  },
  {
    id: 5,
    title: "Overlapping Event 2",
    start: new Date(2024, 0, 31, 11, 30),
    end: new Date(2024, 0, 31, 12, 30),
    type: "full-day-event",
    goto: "/CreateEvent",
  },
  {
    id: 6,
    title: "Week-Long Event",
    start: new Date(2024, 0, 31),
    end: new Date(2024, 1, 7),
    type: "self-paced",
    goto: "/CreateEvent",
  },
  {
    id: 7,
    title: "VILT Session",
    start: new Date(2024, 0, 31, 14, 0),
    end: new Date(2024, 0, 31, 16, 0),
    type: "vilt",
    goto: "/CreateEvent",
  },
];

const MyCalendar = () => {
  useEffect(() => {
    document.title = "Event Scheduler";
  }, []);

  const [events, setEvents] = useState(initialEvents);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleEventClick = (event) => {
    console.log("Event Clicked:", event);
    // setShowModal(true);
    navigate(`${event.goto}`);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "";
    switch (event.type) {
      case "short-event":
        backgroundColor = "blue";
        break;
      case "full-day-event":
        backgroundColor = "green";
        break;
      case "multi-day-event":
        backgroundColor = "orange";
        break;
      case "self-paced":
        backgroundColor = "purple";
        break;
      case "vilt":
        backgroundColor = "red";
        break;
      default:
        backgroundColor = "gray";
    }

    const style = {
      backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style,
    };
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week", "day", "month", "agenda"]}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick}
      />
      {showModal && <Modal event={selectedEvent} onClose={handleModalClose} />}
    </div>
  );
};

export default MyCalendar;
