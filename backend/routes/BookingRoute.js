const express = require('express');
const { checkUser, checkAdmin, checkReceptionist } = require('../middlewares/auth');
const router = express.Router();

const bookingController = require('../controllers/BookingController');

router.get('/getRoom', bookingController.getRoom);
router.get('/getAllBooking', checkReceptionist, bookingController.getAllBooking);
router.get('/getBooking', checkUser, bookingController.getBooking);
router.post('/create', checkUser, bookingController.createBooking);
router.post('/delete', checkUser, bookingController.deleteBooking);
router.post('/update', checkReceptionist, bookingController.updateBooking);

module.exports = router;