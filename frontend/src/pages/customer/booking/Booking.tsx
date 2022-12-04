import { useState } from 'react'
import { Tabs } from 'antd';
import { useParams } from 'react-router';
import BookingForm from 'components/bookingForm/BookingForm';
import Payment from 'components/payment/Payment';

const Booking = () => {
  const { id } = useParams();
  const [form1, setForm1] = useState(false)
  var tabData = [
    {
      label: 'Register Information',
      key: '1',
      children: <BookingForm id={id} setFinish={setForm1} />,
    },
    {
      label: 'Payment',
      key: '2',
      children: <Payment />,
      forceRender: form1,
      disabled: !form1
    }
  ]
  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={tabData}
    />
  )
};

export default Booking;