const { firestore } = require('../firebase/firebase');

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

module.exports = { createRoom, deleteRoom }