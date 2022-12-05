import { useEffect, useState } from 'react';
import { Badge, Descriptions } from 'antd';
import { BookingListItem } from './BookList';
import { url } from 'stores/constant'
import { RoomCard } from 'components/roomList/RoomList'

type BookingDetailProps = {
  bookingInfo: BookingListItem,
}

const BookingDetail = (props: BookingDetailProps) => {
  const { fromTime, toTime, roomNum, status, paymentMethod } = props.bookingInfo
  const [data, setData] = useState<RoomCard>();
  const getRoomInfo = async () => {
    await fetch(url + `/rooms/${roomNum}`, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET"
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res)
      });
  }
  useEffect(() => {
    console.log("Detail booking", roomNum)
    getRoomInfo()
  }, [])
  return (
    <Descriptions layout="vertical" bordered>
      <Descriptions.Item label="Total Cost">$80.00</Descriptions.Item>
      <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
      <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
      <Descriptions.Item label="Status">
        <Badge status="processing" text={status} />
      </Descriptions.Item>
      <Descriptions.Item span={2} label="Payment Method">{paymentMethod}</Descriptions.Item>
      <Descriptions.Item label="Check In time">{fromTime.toString()}</Descriptions.Item>
      <Descriptions.Item label="Check out Time" span={2}>
        {toTime.toString()}
      </Descriptions.Item>

      <Descriptions.Item label="Room Information">
        Room type: {data?.type}
        <br />
        Price per day: {data?.price}
        <br />
        Room Number: {data?.roomNum}
        <br />
        Description: {data?.description}
        <br />
      </Descriptions.Item>
    </Descriptions>
  )
};

export default BookingDetail;