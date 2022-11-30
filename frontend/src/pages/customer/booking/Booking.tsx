import React from 'react';
import { Tabs } from 'antd';
import { RoomCard } from 'components/roomList/RoomList';
import BookingForm from 'components/bookingForm/BookingForm';
import type { TabsProps } from 'antd';

type BookingProps = {
  roomInfo: RoomCard
}


const tabData = [
  {
    label: 'Register Information',
    key: '1',
    children: <BookingForm />,
  },
  {
    label: 'Review',
    key: '2',
    children: <BookingForm />,
  },
  {
    label: 'Payment',
    key: '3',
    children: <BookingForm />,
  }
]

const Booking = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={tabData}
    />
  )
};

export default Booking;