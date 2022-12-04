import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const FailBooking: React.FC = () => (
  <Result
    status="error"
    title="Booking Failed"
    subTitle="Please try again."
  >
  </Result>
);

export default FailBooking;