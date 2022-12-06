import React from 'react';
import "./Room.css";
import { Space, Table, Tag, notification, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table';

import { useEffect, useState } from 'react';

interface DataType {
  no: number;
  email: string;
  name: string;
  roomtype: string;
  roomNum: number;
  start: string;
  end: string;
  price: number;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'no',
    dataIndex: 'no',
    key: 'no',
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
        var color = status = 'awaiting' ? 'green' : 'geekblue';
        if (status === 'loser') {
          color = 'volcano';
        }
        return (
          <Tag color={color} key={status}>
            {status != undefined ? status.toUpperCase() : "UNDEFINED"}
          </Tag>
        );
      }
    }
  },
]

const ViewBooking = () => {
  const [data, setData] = useState<DataType[]>([])

  const getAllBookings = async () => {
    await fetch("https://backend-6ch5yx6zaq-et.a.run.app/bookings/getAllBooking", {
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
          placement: 'top',
        });
      })
  };

  useEffect(() => {
    getAllBookings()
    console.log('Check again', data)
  }, [])

  return (
    <div className="">
      <h1>Booking Screen</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ViewBooking;
