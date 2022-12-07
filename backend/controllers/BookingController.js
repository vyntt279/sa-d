const { firestore } = require('../firebase/firebase');

const getRoom = async (req, res) => {
    const snapshot = await firestore.collection('rooms').get();
    const list = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    res.send(list);
}

const getAllBooking = async (req, res) => {
    const snapshot = await firestore.collection('bookings').get();
    const list = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    res.send(list);
}

const getBooking = async (req, res) => {
    const { uid } = req.user;

    const snapshot = await firestore
    .collection('bookings')
    .where("userId", '==', uid)
    .get();
    
    const list = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    res.send(list);
}
const createBooking = async (req, res) => {
    const { 
        roomNum, 
        fromTime, 
        toTime, 
        status,
        paymentMethod 
    } = req.body;

    const { uid: userId } = req.user;

    try {
        if (!roomNum || !userId || !fromTime || !toTime || !status || !paymentMethod){
            return res.status(400).json({ error: 'Bad request' });
        }

        const doc = await firestore.collection('bookings').add({
            roomNum: roomNum, 
            userId: userId, 
            fromTime: new Date(fromTime),
            toTime: new Date(toTime), 
            status: status,
            paymentMethod: paymentMethod
        });
        
        const id = doc.id;
        return res.status(200).json({ id });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

const deleteBooking = async (req, res) => {
    const {
        bookingId
    } = req.body

    const { uid: userId } = req.user;

    try {
        const doc = await firestore.collection('bookings').doc(bookingId).get();
        const id = doc.id;
        if (!doc.exists) {
            return res.status(400).json({ error: 'Bad request' });
        }

        if (doc.data().userId !== userId) {
            return res.status(403).json({ error: 'No permission' });
        }

        await doc.ref.delete();

        return res.status(200).json({ id });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

const updateBooking = async (req, res) => {
    const {
        bookingId,
        status,
    } = req.body

    try {
        const doc = await firestore.collection('bookings').doc(bookingId).get();
        const id = doc.id;
 
        if (!doc.exists) {
            return res.status(400).json({ error: "Booking ID doesn't exist" });
        }

        if (status === 'checked-in') {
            const room = await firestore.collection('rooms').doc(doc.data().roomNum).get();
            if (room.data().status === 'not-available') {
                return res.status(400).json({ error: 'Room is not available' });
            }
            await room.ref.update({
                status: 'not-available',
            });
        }
        else if (status === 'checked-out') {
            const room = await firestore.collection('rooms').doc(doc.data().roomNum).get();
            await room.ref.update({
                status: 'available',
            });
        }
        else {
            return res.status(400).json({ error: 'status must be "checked-in" or "checked-out"' });
        }

        await doc.ref.update({
            status: status,
        });

        return res.status(200).json({ id });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

module.exports = { getRoom, getBooking, createBooking, deleteBooking, getAllBooking, updateBooking };