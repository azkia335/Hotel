import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="panel-logo">
        <img className="logo" src={logo}></img>
      </div>

      <h2 className="namahotel">Hotel Seulanga</h2>

      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/booking">Booking</Link>
      </div>
    </div>
  );
}

export default Navbar;
