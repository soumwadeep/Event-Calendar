import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-3 fw-bold">
      <Link className="nav-link" to="/Home">
        <h5>Copyright @ Sg Event Scheduler</h5>
      </Link>
    </div>
  );
};

export default Footer;
