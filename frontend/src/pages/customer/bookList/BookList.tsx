import React, { useEffect, useState } from 'react';
import { Button, List, Modal } from 'antd';
import VirtualList from 'rc-virtual-list';

import { fetchData } from 'stores/constant'
import BookingDetail from './BookingDetail';

export interface BookingListItem {
  fromTime: string;
  toTime: string;
  roomNum: string;
  id: string;
  status: string,
  paymentMethod: string,
}

const ContainerHeight = 400;

const fakeData = [{
  fromTime: "10/12/2022",
  toTime: "10/12/2022",
  roomNum: "199",
  id: "abc",
  status: "completed",
  paymentMethod: "card",
}]

const BookList: React.FC = () => {
  const [data, setData] = useState<BookingListItem[]>([]);
  const [open, setOpen] = useState(false);

  const appendData = (response: any) => {
    setData(response)
  };

  useEffect(() => {
    fetchData("/bookings/getBooking", {}, "GET", "Cannot get bookings", true, appendData)
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
    //   appendData();
    // }
  };

  const renderDescription = (checkIn: string, checkOut: string) => {
    return (<>
      <p>Check In: {checkIn}</p>
      <p>Check OutL {checkOut}</p>
    </>)
  }

  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item: BookingListItem) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.id}</a>}
              description={renderDescription(item.fromTime, item.toTime)}
            />
            <Button type="primary" onClick={() => setOpen(true)}>
              Detail
            </Button>
            <Modal
              title="Booking Information"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={1000}
            >
              <BookingDetail bookingInfo={item} />
            </Modal>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default BookList;