import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../components/FirebaseConfig";
const CreateEvent = () => {
  useEffect(() => {
    document.title = "Create An Event | Event Scheduler";
    document.description = "Create An Event With Event Scheduler";
  }, []);

  const navigate = useNavigate();
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
      navigate("/Login");
    }
  });

  return (
    <div>
      <h1>Let's Create An Event</h1>
    </div>
  );
};

export default CreateEvent;
