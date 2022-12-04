import { useState } from 'react'
import { Tabs } from 'antd';
import { useParams } from 'react-router';
import BookingForm from 'components/bookingForm/BookingForm';
import Payment from 'components/payment/Payment';
import PreviewBooking from './Preview';

const Booking = () => {
  const { roomNum } = useParams();
  const [activateTab, setActivateTab] = useState(1)
  const [finishTab1, setFinishTab1] = useState(false)
  const [finishTab2, setFinishTab2] = useState(false)

  const handleTabClick = (key: string) => {
    setActivateTab(Number(key))
  }

  var tabData = [
    {
      label: 'Register Information',
      key: '1',
      children: <BookingForm roomNum={roomNum} activateTab={activateTab} setActivateKey={setActivateTab} setFinishTab1={setFinishTab1} />,

    },
    {
      label: 'Preview',
      key: '2',
      children: <PreviewBooking setActivateKey={setActivateTab} setFinishTab2={setFinishTab2}/>,
      disabled: !finishTab1
    },
    {
      label: 'Payment',
      key: '3',
      children: <Payment />,
      disabled: !finishTab2
    }
  ]
  return (
    <Tabs
      activeKey={activateTab.toString()}
      centered
      items={tabData}
      onTabClick={(activateKey: string, _) => handleTabClick(activateKey)}
    />
  )
};

export default Booking;