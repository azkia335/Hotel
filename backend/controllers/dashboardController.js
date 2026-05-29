const db = require("../config/db");

exports.getDashboard = (req, res) => {
  const totalRoomsQuery = "SELECT COUNT(*) AS totalRooms FROM rooms";

  const availableRoomsQuery = "SELECT COUNT(*) AS availableRooms FROM rooms WHERE status='Available'";

  const bookingQuery = "SELECT COUNT(*) AS totalBookings FROM bookings";

  db.query(totalRoomsQuery, (err, totalRoomsResult) => {
    if (err) return res.status(500).json(err);

    db.query(availableRoomsQuery, (err, availableRoomsResult) => {
      if (err) return res.status(500).json(err);

      db.query(bookingQuery, (err, bookingResult) => {
        if (err) return res.status(500).json(err);

        res.json({
          totalRooms: totalRoomsResult[0].totalRooms,
          availableRooms: availableRoomsResult[0].availableRooms,
          totalBookings: bookingResult[0].totalBookings,
        });
      });
    });
  });
};
