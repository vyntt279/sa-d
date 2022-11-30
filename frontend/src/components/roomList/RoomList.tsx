import { Card, List, Avatar, Space, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { url } from 'stores/constant'

const { Meta } = Card;
export interface RoomCard {
  id: string,
  title: string,
  price: number,
  subtitle: string,
  loading: boolean;
  img: string;
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const fakeData = [
  {
    id: 'Title 1',
    title: 'Room A',
    subtitle: 'Small',
    price: 100,
    loading: true,
    img: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
  },
  {
    id: 'Title 2',
    title: 'Room B',
    subtitle: 'Small',
    price: 100,
    loading: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
  },
  {
    id: 'Title 3',
    title: 'Room C',
    subtitle: 'Small',
    price: 100,
    loading: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
  },
  {
    id: 'Title 4',
    title: 'Room D',
    subtitle: 'Small',
    price: 100,
    loading: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
  },
];
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
    });
  }

  useEffect(() => {
    setData(fakeData)
    getRooms()
  }, []);

  const renderRoomItem = (item: any) => {
    console.log("Render room")
    return <List.Item
      key={item.id}
      actions={[
        <Button href="/book-process" type="primary">
          Book
        </Button>
      ]}
      extra={
        <img
          width={272}
          alt="logo"
          src={item.img}
        />
      }
    >
      <List.Item.Meta
        title={<a href={item.href}>{item.title}</a>}
        description={item.subtitle}
      />
      {item.price}
    </List.Item>
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 2,
      }}
      dataSource={data}
      renderItem={(item) => renderRoomItem(item)}
    />
  )
}

export default RoomList;