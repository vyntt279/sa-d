import { Button, Result } from 'antd';
import { useParams } from 'react-router';

const SuccessfulBooking = () => {
  const { bookingId, date } = useParams();
  return (
    <Result
      status="success"
      title="Successfully Purchased Booking Room!"
      subTitle={`Booking number: ${bookingId}, see you on ${date}.`}
      extra={[
        <Button href='/' type="primary" key="console">
          Go to Home
        </Button>,
        <Button href='/bookings' key="buy">See Your Bookings</Button>,
      ]}
    />)
}

export default SuccessfulBooking;