import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <ul className="nav justify-content-center sticky-top">
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
    </ul>
  );
};

export default Navbar;
