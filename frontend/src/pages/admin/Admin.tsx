import React from 'react';
import { Layout, Menu, Tabs } from 'antd';
import Room from './Room.js';
import ViewBooking from './ViewBooking';

const { Header, Content, Footer } = Layout;

const MainRoom: React.FC = () => (
  <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Room Management" key="1">
      <Room></Room>
    </Tabs.TabPane>
    <Tabs.TabPane tab="Booking" key="2">
      <ViewBooking></ViewBooking>
    </Tabs.TabPane>
  </Tabs>
);

export default MainRoom;