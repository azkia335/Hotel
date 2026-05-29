import { useEffect, useState } from "react";
import axios from "axios";
import {
  BedDouble,
  DoorOpen,
  CalendarCheck
} from 'lucide-react';

import Sidebar from '../components/Sidebar';

function Dashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/dashboard").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Dashboard Hotel</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Rooms</h3>
          <p>{stats.totalRooms}</p>
        </div>

        <div className="card">
          <h3>Available Rooms</h3>
          <p>{stats.availableRooms}</p>
        </div>

        <div className="card">
          <h3>Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
