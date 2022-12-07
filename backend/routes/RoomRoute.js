const express = require('express');
const { checkAdmin, checkReceptionist } = require('../middlewares/auth');
const router = express.Router();

const roomController = require('../controllers/RoomController');

router.post('/create', checkAdmin, roomController.createRoom);
router.post('/delete', checkAdmin, roomController.deleteRoom);
router.get('/:roomNum', roomController.getRoom);

module.exports = router;