const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

const userRoute = require('./routes/UserRoute');
const bookingRoute = require('./routes/BookingRoute');

app.use('/users', userRoute);
app.use('/bookings', bookingRoute);

app.listen(8000, () => {
    console.log('Server started on port 8000');
});

const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));