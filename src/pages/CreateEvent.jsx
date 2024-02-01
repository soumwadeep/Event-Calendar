import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { auth, db } from "../components/FirebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import moment from "moment";

const CreateEvent = () => {
  useEffect(() => {
    document.title = "Create An Event | Event Scheduler";
    document.description = "Create An Event With Event Scheduler";
  }, []);

  const [userEmail, setUserEmail] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserEmail(user.email);
    } else {
      Swal.fire(
        "You Must Be Logged In To Create An Event!",
        "Please Login To Create An Event.",
        "error"
      );
      window.location.replace("/Login");
    }
  });

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("short-event");
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [eventLink, setEventLink] = useState("");
  const [isEventCreating, setIsEventCreating] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsEventCreating(true);
    try {
      // Convert the selected dates to UTC format
      const start = moment.utc(eventStartDate).toDate();
      const end = moment.utc(eventEndDate).toDate();
      const eventData = {
        EventName: eventName,
        EventType: eventType,
        EventStartDate: start,
        EventEndDate: end,
        EventLink: eventLink,
        EventCreatedBy: userEmail,
        EventCreatedAt: serverTimestamp(),
      };
      await addDoc(collection(db, "Events"), eventData);
      Swal.fire("Event Created!", "Visit Home To See Your Events!", "success");
    } catch (e) {
      console.log("Event Creation Error", e);
      Swal.fire("Event Creation Failed!", `${e.message}`, "error");
    } finally {
      setIsEventCreating(false);
    }
  };
  // console.log(eventStartDate);
  return (
    <div>
      <h1>Let's Create An Event</h1>
      <center>
        <form className="login-form">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Event Name"
              required
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option selected>Choose Event Type</option>
              <option value="short-event">Short Event</option>
              <option value="full-day-event">Full Day Event</option>
              <option value="multi-day-event">Multi Day Event</option>
              <option value="self-paced">Self Paced Event</option>
              <option value="vilt">VILT</option>
            </select>
          </div>
          <div className="mb-3">
            <DatePicker
              showTimeSelect
              selected={eventStartDate}
              onChange={(date) => setEventStartDate(date)}
              dateFormat="Pp"
            />
          </div>
          <div className="mb-3">
            <DatePicker
              showTimeSelect
              selected={eventEndDate}
              onChange={(date) => setEventEndDate(date)}
              dateFormat="Pp"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Event Link"
              required
              value={eventLink}
              onChange={(e) => setEventLink(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success fw-bold"
            onClick={handleCreate}
            disabled={isEventCreating}
          >
            {isEventCreating ? "Creating..." : "Create Event"}
          </button>
        </form>
      </center>
    </div>
  );
};

export default CreateEvent;
