import { useState, useEffect } from "react";
const CreateEvent = () => {
  useEffect(() => {
    document.title = "Create An Event | Event Scheduler";
    document.description = "Create An Event With Event Scheduler";
  }, []);
  return (
    <div>
      <h1>Let's Create An Event</h1>
    </div>
  );
};

export default CreateEvent;
