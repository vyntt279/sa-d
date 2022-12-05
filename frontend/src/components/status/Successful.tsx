import { Button, Result } from 'antd';
import { useParams } from 'react-router';

export type SuccessfulBookingProps = {
  bookingId: string,
  date: string
}

const SuccessfulBooking = ({ bookingId, date }: SuccessfulBookingProps) => {
  return (
    <Result
      status="success"
      title="Successfully Purchased Booking Room!"
      subTitle={`Booking number: ${bookingId}, see you on ${date}.`}

    />)
}

export default SuccessfulBooking;