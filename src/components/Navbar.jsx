import { NavLink } from "react-router-dom";
import { auth } from "./FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import Swal from "sweetalert2";

const Navbar = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserEmail(user.email);
    } 
    // else {
    //   console.log("User Is Not Logged In.");
    // }
  });

  const handleLogOut = async (e) => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      Swal.fire(
        "Logged Out Successfully!",
        "We Hope To See You Soon...",
        "success"
      );
      window.location.replace("/Login");
    } catch (e) {
      Swal.fire("Logged Out Failed!", `${e.message}`, "error");
      console.log(e);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <ul className="nav justify-content-center sticky-top mb-3">
      <li className="nav-item">
        <NavLink
          to="/Home"
          className={({ isActive, isPending }) =>
            isActive ? "nav-link active" : isPending ? "pending" : "nav-link "
          }
        >
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/CreateEvent"
          className={({ isActive, isPending }) =>
            isActive ? "nav-link active" : isPending ? "pending" : "nav-link "
          }
        >
          Create Event
        </NavLink>
      </li>
      {userEmail.length > 0 ? (
        <button
          className="btn btn-danger"
          onClick={handleLogOut}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging Out..." : "Log Out"}
        </button>
      ) : (
        <li className="nav-item">
          <NavLink
            to="/Login"
            className={({ isActive, isPending }) =>
              isActive ? "nav-link active" : isPending ? "pending" : "nav-link "
            }
          >
            Login
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
