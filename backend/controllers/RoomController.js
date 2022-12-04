const { firestore } = require('../firebase/firebase');

const postRoomStatus = async (req, res) => {
    const {
        roomNum,
        status
    } = req.body

    try {
        if (!roomNum || !status) {
            return res.status(400).json({ error: 'Must have 2 attributes: roomNum, status' });
        }

        if (status !== 'available'
            && status !== 'checked-in'
            && status !== 'out-of-order') {
            return res.status(400).json({ error: 'Room status wrong format, must be "available", "checked-in", "out-of-order"' });
        }

        const doc = await firestore.collection('rooms').where('roomNum', '==', roomNum).get();
        if (doc.empty) {
            return res.status(400).json({ error: 'Room not found' });
        }

        const id = doc.docs[0].id;
        await firestore.collection('rooms').doc(id).update({
            status: status
        });

        return res.status(200).json({ 
            roomNum: roomNum,
            status: status
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

const createRoom = async (req, res) => {
    const { 
        roomNum, 
        bookingId, // Should be null at first
        type,
        images,
        status,
        price,
        description 
    } = req.body;

    // const { uid: userId } = req.user;

    try {
        if (!roomNum || !bookingId || !type || !images || !status || !price || !description){
            return res.status(400).json({ error: 'Bad request' });
        }

        const doc = await firestore.collection('rooms').add({
            roomNum: roomNum, 
            bookingId: bookingId,
            type: type,
            images: images,
            status: status,
            price: price,
            description: description
        });
        
        const id = doc.id;
        return res.status(200).json({ id });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

const deleteRoom = async (req, res) => {
    const {
        roomId
    } = req.body

    try {
        const doc = await firestore.collection('rooms').doc(roomId).get();
        const id = doc.id;
        if (!doc.exists) {
            return res.status(400).json({ error: 'Bad request' });
        }
        
        await doc.ref.delete();

        return res.status(200).json({ id });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

const getRoom = async (req, res) => {
    const { roomNum } = req.params;

    try {
        if (!roomNum) {
            return res.status(400).json({ error: 'Must have 1 attribute: roomNum' });
        }

        const doc = await firestore.collection('rooms').where('roomNum', '==', roomNum).get();
        if (doc.empty) {
            return res.status(400).json({ error: 'Room not found' });
        }

        const id = doc.docs[0].id;
        const data = doc.docs[0].data();
        return res.status(200).json({
            id: id,
            ...data
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

module.exports = { createRoom, deleteRoom, postRoomStatus, getRoom }