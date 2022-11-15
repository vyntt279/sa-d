const { firestore, auth } = require('../firebase/firebase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const register = async (req, res) => {
    const { email, password, fullName, phone } = req.body;
    try {
        if (!email || !password || !fullName || !phone) {
            return res.status(400).json({ error: 'Bad request' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Email is not valid' });
        }

        // Check phone only contains numbers
        const phoneRegex = /^[0-9]+$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ error: 'Phone is not valid' });
        }

        const user = await auth.createUser({ email, password });

        // Create hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        await firestore.collection('users').doc(user.uid).set({
            email,
            fullName,
            phone,
            role: 'user',
            password: hashPassword
        });

        const payload = {
            uid: user.uid,
            email: user.email,
            role: 'user'
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Bad request' });
        }

        const user = await auth.getUserByEmail(email);
        const doc = await firestore.collection('users').doc(user.uid).get();

        if (!doc.exists) {
            return res.status(400).json({ error: 'Bad request' });
        }

        const hashPassword = doc.data().password;
        const isMatch = await bcrypt.compare(password, hashPassword);
        if (!isMatch) {
            return res.status(400).json({ error: 'Bad request' });
        }

        const payload = {
            uid: user.uid,
            email: user.email,
            role: doc.data().role
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

module.exports = { register, login };