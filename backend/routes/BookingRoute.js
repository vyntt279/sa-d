const express = require('express');
const { checkUser } = require('../middlewares/auth');
const router = express.Router();

const bookingController = require('../controllers/BookingController');

router.get('/getRoom', bookingController.getRoom);
router.get('/getBooking', checkUser, bookingController.getBooking);
router.post('/create', checkUser, bookingController.createBooking);
router.post('/delete', checkUser, bookingController.deleteBooking);

module.exports = router;