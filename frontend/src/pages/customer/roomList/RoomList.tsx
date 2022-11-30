import { Card, List, Avatar, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

import Room from "components/roomDetail/Room";

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}
type RoomListProps = {
  type: string,
  list: []
}
const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];
const count = 3
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const RoomList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const renderRoomItem = (item: any) => {
    return <List.Item>
      {/* e<Card title={item.title}>Card content</Card> */}
      <Skeleton avatar title={false} loading={item.loading} active>
        <List.Item.Meta
          avatar={<Avatar src={item.picture.large} />}
          title={<a href="https://ant.design">{item.name?.last}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
        <div>content</div>
      </Skeleton>
    </List.Item>
  }

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={data}
      renderItem={(item) => renderRoomItem(item)}
    />
  )
}

export default RoomList;