import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/Home">
        <img className="logo" src="/logo.png" />
      </Link>
      <h1>Event Scheduler</h1>
      <Link to="/CreateEvent" className="links">
        Schedule Event
      </Link>
    </div>
  );
};

export default Navbar;
