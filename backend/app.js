const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

app.use(express.json());
app.use(cors());

const userRoute = require('./routes/UserRoute');
const bookingRoute = require('./routes/BookingRoute');
const roomRoute = require('./routes/RoomRoute');

app.use('/users', userRoute);
app.use('/bookings', bookingRoute);
app.use('/rooms', roomRoute);

app.listen(8080, () => {
    console.log('Server started on port 8080');
});

const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));