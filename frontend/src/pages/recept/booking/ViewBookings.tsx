import { Space, Table, Tag, notification, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table';

import { url } from 'stores/constant'
import { useEffect, useState } from 'react';
import { BookingListItem } from 'pages/customer/bookList/BookList';
const columns: ColumnsType<BookingListItem> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Room Number',
    dataIndex: 'roomNum',
    key: 'roomNum',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => {
      {
        var color = status ? 'geekblue' : 'green';
        if (status === 'loser') {
          color = 'volcano';
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      }
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space className="">
        <Button type='primary' onClick={handleCheckIn}>Check In</Button>
        <Button onClick={handleCheckOut}>Check Out</Button>
      </Space>
    ),
  },
]
const handleCheckIn = () => {

}
const handleCheckOut = () => {

}

const fakeData = [{
  fromTime: "10/12/2022",
  toTime: "10/12/2022",
  roomNum: "199",
  id: "abc",
  status: "completed",
  paymentMethod: "card",
}]

const ViewBooking = () => {
  const [data, setData] = useState<BookingListItem[]>([])

  const getAllBookings = async () => {
    await fetch(url + "/bookings/getAllBooking", {
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('Data', response)
        setData(response)
      })
      .catch((reason) => {
        console.log(reason)
        notification.info({
          message: `Cannot get all bookings, please try again`,
          placement: 'top',
        });
      })

  };

  useEffect(() => {
    // getAllBookings()
    setData(fakeData)
  }, [])

  return (
    <div className="">
      <h1>Booking Screen</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ViewBooking;