import { Card, List, Statistic, Space, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { url } from 'stores/constant'
import CarouselImage from './CarouselImage';
import bedroom from "assets/bedroom.jpg"
import livingroom from "assets/livingroom.jpg"

export interface RoomCard {
  bookingId: string,
  description: string,
  id: string,
  price: number,
  roomNum: string,
  status: string,
  type: string
}

const RoomList = () => {
  const [data, setData] = useState<RoomCard[]>([]);

  const getRooms = async () => {
    const result = await fetch(url + "/bookings/getRoom", {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET"
    }).then((res) => res.json()).then((res) => {
      setData(res)
    });
  }

  useEffect(() => {
    getRooms()
  }, []);

  const renderRoomItem = (item: any) => {
    console.log("Render room")
    return <List.Item
      className='mt-5'
      key={item.id}
    >
      <Card style={{ width: "400px" }} cover={<CarouselImage images={[bedroom, livingroom]} />} title={<a href={item.href} className="capitalize">{item.type}</a>}>
        <Space direction="vertical" align='center'>
          <p>
            {item.description}
          </p>
          <Statistic title="Price" value={item.price} prefix='$' />
          <Button href={`/book-process?id=${item.id}`} type="primary">
            Book
          </Button>
        </Space>
      </Card>
    </List.Item >
  }

  return (
    <List
      grid={{ column: 4, md: 2 }}
      size="small"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
      }}
      dataSource={data}
      renderItem={(item) => renderRoomItem(item)}
    />
  )
}

export default RoomList;