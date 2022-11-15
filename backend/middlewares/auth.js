const jwt = require('jsonwebtoken');

const checkUser = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (payload.role === 'user') {
            req.user = payload;
            next();
        }
        else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    });
}

const checkAdmin = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (payload.role === 'admin') {
            req.user = payload;
            next();
        }
        else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    });
}

module.exports = { checkUser, checkAdmin };