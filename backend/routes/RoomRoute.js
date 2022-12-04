const express = require('express');
const { checkAdmin } = require('../middlewares/auth');
const router = express.Router();

const roomController = require('../controllers/RoomController');

router.post('/create', checkAdmin, roomController.createRoom);
router.post('/delete', checkAdmin, roomController.deleteRoom);

module.exports = router;