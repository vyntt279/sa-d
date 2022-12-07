import { Card, List, Statistic, Space, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { url } from 'stores/constant'
import CarouselImage from './CarouselImage';
import { images } from 'stores/constant';

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
      <Card style={{ width: "400px" }} cover={<CarouselImage images={images} />} title={<p className="capitalize text-xl tracking-wide comforta">{item.type}</p>}>
        <Space direction="vertical" align='center'>
          <p className='cutive-mono text-lg'>
            {item.description}
          </p>
          <Statistic className='cutive-mono' valueStyle={{ fontFamily: 'Cutive Mono' }} title="Price" value={item.price} prefix='$' />
          <Button className='button text-lg m-3' href={`/book-process/${item.roomNum}`} type="primary">
            Book now
          </Button>
        </Space>
      </Card>
    </List.Item >
  }

  return (
    <List
      grid={{ column: 4, gutter: 1, xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
      size="small"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        showLessItems: true,
        pageSize: 8
      }}
      dataSource={data}
      renderItem={(item) => renderRoomItem(item)}
    />
  )
}

export default RoomList;