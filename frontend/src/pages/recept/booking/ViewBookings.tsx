import { Space, Table, Tag, notification, Button, Statistic } from 'antd'
import type { ColumnsType } from 'antd/es/table';

import { url } from 'stores/constant'
import { useEffect, useState } from 'react';
import { BookingListItem } from 'pages/customer/bookList/BookList';
import RoomStatus from './RoomStatus';

export const renderPayment = (status: string) => {
  var color = status == 'paid' ? 'green' : 'geekblue';
  if (status === 'unpaid') {
    color = 'volcano';
  }
  return (
    <Tag color={color} key={status}>
      {status != undefined ? status.toUpperCase() : "UNDEFINED"}
    </Tag>
  );
}

// const fakeData: BookingListItem[] = [{
//   id: "1",
//   roomNum: "199",
//   status: "expired",
//   fromTime: ,
//   toTime: new Date(),
//   paymentMethod: "card"
// },
// {
//   id: "2",
//   roomNum: "199",
//   status: "waiting",
//   fromTime: new Date(),
//   toTime: new Date(),
//   paymentMethod: "card"
// },
// {
//   id: "3",
//   roomNum: "199",
//   status: "checked in",
//   fromTime: new Date(),
//   toTime: new Date(),
//   paymentMethod: "card"
// },
// {
//   id: "4",
//   roomNum: "199",
//   status: "checked out",
//   fromTime: new Date(),
//   toTime: new Date(),
//   paymentMethod: "card"
// }]

const columns: ColumnsType<BookingListItem> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Room Num',
    dataIndex: 'roomNum',
    key: 'roomNum',
    render: (_, { roomNum }) => {
      return (
        <RoomStatus roomNum={roomNum} />
      )
    }
  },
  {
    title: 'Check In Time',
    dataIndex: 'checkInTime',
    key: 'checkInTime',
    render: (_, { fromTime }) => {
      const date = new Date(fromTime._seconds)
      return (<>
        <p>Date: {date.toDateString()}</p>
        <p>Time: {date.toTimeString()}</p>
      </>
      )
    }
  },
  {
    title: 'Check Out Time',
    dataIndex: 'checkOutTime',
    key: 'checkOutTime',
    render: (_, { toTime }) => {
      const date = new Date(toTime._seconds)
      return (<>
        <p>Date: {date.toDateString()}</p>
        <p>Time: {date.toTimeString()}</p>
      </>)
    }
  },
  {
    title: 'Cost',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    render: (_, { roomNum }) => {
      return (<>
        <Statistic value={roomNum} prefix='$' valueStyle={{ fontSize: '1em' }} />
        {renderPayment('paid')}
      </>

      )
    }
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => {
      var color = status == 'waiting' ? 'green' : 'geekblue';
      if (status === 'expired') {
        color = 'volcano';
      }
      return (
        <Tag color={color} key={status}>
          {status != undefined ? status.toUpperCase() : "UNDEFINED"}
        </Tag>
      );
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, { id, status }) => (
      <Space className="">
        <Button disabled={status !== 'waiting'} type='primary' onClick={() => updateBookingStatus(id, "checked-in")}>Check In</Button>
        <Button disabled={status !== 'checked in'} onClick={() => updateBookingStatus(id, "checked-out")}>Check Out</Button>
      </Space>
    ),
  }
]


const updateBookingStatus = async (bookingId: string, status: string) => {
  await fetch(url + "/bookings/update", {
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authorization')
    },
    method: "POST",
    body: JSON.stringify({
      bookingId: bookingId,
      status: status
    })
  })
    .then((response) => response.json())
    .then((response) => {
      console.log('Data', response)
      if (response.error == undefined) {
        notification.info({
          message: `${bookingId} is ${status} successfully`
        })
      }
    })
    .catch((reason) => {
      console.log(reason)
      notification.info({
        message: `Failed, please try again`,
      });
    })
}

const ViewBooking = () => {
  const [data, setData] = useState<BookingListItem[]>([])

  const getAllBookings = async () => {
    await fetch(url + "/bookings/getAllBooking", {
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authorization')
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('Data', response)
        if (response.error == undefined) {
          setData(response)
        }
      })
      .catch((reason) => {
        console.log(reason)
        notification.info({
          message: `Cannot get all bookings, please try again`,
        });
      })
  };

  useEffect(() => {
    getAllBookings()
  }, [])

  return (
    <div className="">
      <h1>Booking Screen</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ViewBooking;