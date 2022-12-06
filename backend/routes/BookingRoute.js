const express = require('express');
const { checkUser, checkReceptionist } = require('../middlewares/auth');
const router = express.Router();

const bookingController = require('../controllers/BookingController');

router.get('/getRoom', bookingController.getRoom);
router.get('/getAllBooking', checkReceptionist, bookingController.getAllBooking);
router.get('/getBooking', checkUser, bookingController.getBooking);
router.post('/create', checkUser, bookingController.createBooking);
router.post('/delete', checkUser, bookingController.deleteBooking);
router.post('/updateStatus', checkReceptionist, bookingController.updateStatus);

module.exports = router;