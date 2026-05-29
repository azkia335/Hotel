const db = require("../config/db");

exports.getBookings = (req, res) => {
  const query = `
    SELECT bookings.*, rooms.room_number
    FROM bookings
    JOIN rooms ON bookings.room_id = rooms.id
    ORDER BY bookings.id DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
};

exports.addBooking = (req, res) => {
  const { guest_name, room_id, check_in, check_out } = req.body;

  if (!guest_name || !room_id || !check_in || !check_out) {
    return res.status(400).json({
      message: "Semua field wajib diisi",
    });
  }

  const bookingQuery = `
    INSERT INTO bookings
    (guest_name, room_id, check_in, check_out, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(bookingQuery, [guest_name, room_id, check_in, check_out, "Check In"], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        error: err,
      });
    }

    const updateRoomQuery = `
        UPDATE rooms
        SET status='Booked'
        WHERE id=?
      `;

    db.query(updateRoomQuery, [room_id], (err2, result2) => {
      if (err2) {
        console.log(err2);

        return res.status(500).json({
          error: err2,
        });
      }

      res.json({
        message: "Check In berhasil",
      });
    });
  });
};

exports.checkOut = (req, res) => {
  const bookingId = req.params.id;

  const getBookingQuery = "SELECT * FROM bookings WHERE id=?";

  db.query(getBookingQuery, [bookingId], (err, bookingResult) => {
    if (err) {
      return res.status(500).json(err);
    }

    const roomId = bookingResult[0].room_id;

    db.query("UPDATE bookings SET status='Check Out' WHERE id=?", [bookingId], (err2) => {
      if (err2) {
        return res.status(500).json(err2);
      }

      db.query("UPDATE rooms SET status='Available' WHERE id=?", [roomId], (err3) => {
        if (err3) {
          return res.status(500).json(err3);
        }

        res.json({
          message: "Check Out berhasil",
        });
      });
    });
  });
};
