const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');

router.get('/', bookingController.getBookings);

router.post('/', bookingController.addBooking);

router.put('/checkout/:id', bookingController.checkOut);

module.exports = router;
