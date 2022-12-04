import { Button, Result } from 'antd';
import { useParams } from 'react-router';

const SuccessfulBooking = () => {
  const { bookingId, date } = useParams();
  return (
    <Result
      status="success"
      title="Successfully Purchased Booking Room!"
      subTitle={`Booking number: ${bookingId}, see you on ${date}.`}
      
    />)
}

export default SuccessfulBooking;