import { LayoutDashboard, BedDouble, CalendarCheck, ClipboardList, Users, LogOut } from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-section">
        <div className="logo-circle">S</div>

        <h1>SEULANGA HOTEL</h1>

        <p>Hospitality With Heart</p>
      </div>

      <div className="menu">
        <Link to="/">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link to="/rooms">
          <BedDouble size={20} />
          Rooms
        </Link>

        <Link to="/booking">
          <CalendarCheck size={20} />
          Booking
        </Link>

        <Link to="/checkin">
          <ClipboardList size={20} />
          Check In / Out
        </Link>

        <Link to="/users">
          <Users size={20} />
          Users
        </Link>

        <Link to="/logout">
          <LogOut size={20} />
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
