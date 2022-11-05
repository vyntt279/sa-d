const express = require('express');
const app = express();

app.use(express.json());

const userRoute = require('./routes/UserRoute');

app.use('/users', userRoute);

app.listen(8000, () => {
    console.log('Server started on port 8000');
});