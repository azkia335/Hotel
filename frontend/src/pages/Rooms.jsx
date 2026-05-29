import { useEffect, useState } from "react";
import axios from "axios";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  const [form, setForm] = useState({
    room_number: "",
    type: "",
    price: "",
    status: "",
  });

  const getRooms = () => {
    axios.get("http://localhost:3000/api/rooms").then((res) => {
      setRooms(res.data);
    });
  };

  useEffect(() => {
    getRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3000/api/rooms", form);

    alert("Room berhasil ditambahkan");

    setForm({
      room_number: "",
      type: "",
      price: "",
      status: "",
    });

    getRooms();
  };

  return (
    <div className="container">
      <h1>Data Rooms</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Room Number" value={form.room_number} onChange={(e) => setForm({ ...form, room_number: e.target.value })} />

        <input type="text" placeholder="Room Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />

        <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />

        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="">Select Status</option>
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
        </select>

        <button type="submit">Tambah Room</button>
      </form>

      <br />

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Room</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room, index) => (
            <tr key={room.id}>
              <td>{index + 1}</td>
              <td>{room.room_number}</td>
              <td>{room.type}</td>
              <td>Rp {room.price}</td>
              <td>{room.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Rooms;
