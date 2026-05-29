const express = require("express");
const cors = require("cors");

const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
