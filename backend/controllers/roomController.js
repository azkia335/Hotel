const db = require("../config/db");

exports.getRooms = (req, res) => {
  db.query("SELECT * FROM rooms", (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
};

exports.addRoom = (req, res) => {
  const { room_number, type, price, status } = req.body;

  db.query("INSERT INTO rooms (room_number, type, price, status) VALUES (?, ?, ?, ?)", [room_number, type, price, status], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ message: "Room Added" });
    }
  });
};
