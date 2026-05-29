import { useEffect, useState } from "react";
import axios from "axios";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [form, setForm] = useState({
    guest_name: "",
    room_id: "",
    check_in: "",
    check_out: "",
  });

  useEffect(() => {
    getBookings();

    axios.get("http://localhost:3000/api/rooms").then((res) => {
      setRooms(res.data);
    });
  }, []);

  const getBookings = () => {
    axios.get("http://localhost:3000/api/bookings").then((res) => {
      setBookings(res.data);
    });
  };

  useEffect(() => {
    getBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3000/api/bookings", form);

    alert("Check In berhasil");

    setForm({
      guest_name: "",
      room_id: "",
      check_in: "",
      check_out: "",
    });

    getBookings();
  };

  const handleCheckout = async (id) => {
    await axios.put(`http://localhost:3000/api/bookings/checkout/${id}`);

    alert("Check Out berhasil");

    getBookings();
  };

  return (
    <div className="container">
      <h1>Check In & Check Out</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Guest Name"
          value={form.guest_name}
          onChange={(e) =>
            setForm({
              ...form,
              guest_name: e.target.value,
            })
          }
        />

        <select
  value={form.room_id}
  onChange={(e) =>
    setForm({
      ...form,
      room_id: e.target.value
    })
  }
>
  <option value=''>
    Select Room
  </option>

  {rooms
    .filter(room => room.status === 'Available')
    .map((room) => (
      <option
        key={room.id}
        value={room.id}
      >
        {room.room_number} - {room.type}
      </option>
    ))}
</select>

        <input
          type="date"
          value={form.check_in}
          onChange={(e) =>
            setForm({
              ...form,
              check_in: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={form.check_out}
          onChange={(e) =>
            setForm({
              ...form,
              check_out: e.target.value,
            })
          }
        />

        <button type="submit">Check In</button>
      </form>

      <br />

      <table>
        <thead>
          <tr>
            <th>Guest</th>
            <th>Room</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.guest_name}</td>
              <td>{booking.room_number}</td>
              <td>{booking.check_in}</td>
              <td>{booking.check_out}</td>
              <td>{booking.status}</td>

              <td>{booking.status === "Check In" && <button onClick={() => handleCheckout(booking.id)}>Check Out</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Booking;
