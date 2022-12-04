import React, { useEffect, useState } from 'react';
import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';

import { fetchData } from 'stores/constant'

interface UserItem {
  checkIn: string;
  checkOut: string;
  type: string;
  bookingId: string;
}

const ContainerHeight = 400;

const BookList: React.FC = () => {
  const [data, setData] = useState<UserItem[]>([]);

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
        {(item: UserItem) => (
          <List.Item key={item.bookingId}>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.type}</a>}
              description={renderDescription(item.checkIn, item.checkOut)}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default BookList;