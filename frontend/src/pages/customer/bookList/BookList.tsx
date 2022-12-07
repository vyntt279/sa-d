import { useEffect, useState } from 'react';
import { Space, Table, Tag, notification, Button, Statistic } from 'antd'
import type { ColumnsType } from 'antd/es/table';

import { url } from 'stores/constant'
import { renderPayment } from 'pages/recept/booking/ViewBookings';
import RoomStatus from 'pages/customer/bookList/RoomStatus';

type Time = {
  _seconds: number,
  _nanoseconds: number
}
export interface BookingListItem {
  fromTime: Time;
  toTime: Time;
  roomNum: string;
  id: string;
  status: string,
  paymentMethod: string,
  totalPrice: number
}

const cancleBooking = (id: string) => {
  
}

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
      </>
      )
    }
  },
  {
    title: 'Cost',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    render: (_, { totalPrice }) => {
      return (<>
        <Statistic value={totalPrice} prefix='$' valueStyle={{ fontSize: '1em' }} />
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
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, { id, status }) => (
  //     <Space>
  //       <Button disabled={status !== 'waiting'} type='primary' onClick={() => cancleBooking(id)}>Cancle</Button>
  //     </Space>
  //   ),
  // }
]


const BookList = () => {
  const [data, setData] = useState<BookingListItem[]>([])

  const getAllBookings = async () => {
    await fetch(url + "/bookings/getBooking", {
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

export default BookList;