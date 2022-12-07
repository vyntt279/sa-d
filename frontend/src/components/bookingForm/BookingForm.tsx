import { DatePicker, Form, Input, Checkbox, InputNumber, Button, Card } from 'antd';
import { useState, memo } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons'
import * as dayjs from 'dayjs'


import RoomDetail, { RoomDetailInfo } from './RoomDetail';
import moment from 'moment'
import type { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;
const rangeConfig = {
  rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

type BookingFormProps = {
  roomInfo: RoomDetailInfo | undefined,
  activateTab: number,
  setActivateKey: any,
  setFinishTab1: any,
  setToTime: any,
  setFromTime: any,
  setTotalCost: any,
  setCustomerInfo: any
}

const BookingForm = ({ setCustomerInfo, setTotalCost, roomInfo, activateTab, setActivateKey, setFinishTab1, setFromTime, setToTime }: BookingFormProps) => {
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      +84
    </Form.Item>
  );

  const [currentFromTime, setCurrentFromTime] = useState<dayjs.Dayjs>()
  const [currentToTime, setCurrentToTime] = useState<dayjs.Dayjs>()
  const [adults, setAdults] = useState<number>(1)
  const [children, setChildren] = useState<number>(0)

  const handleSubmit = (value: any) => {
    console.log('Submit', value)
    var interval = currentToTime?.diff(currentFromTime, 'day')
    setTotalCost(Number(roomInfo?.price) * (interval || 0))
    setActivateKey(activateTab + 1)
    setFinishTab1(true)
    setFromTime(currentFromTime?.toString())
    setToTime(currentToTime?.toString())
    setCustomerInfo({ email: localStorage.getItem('email'), phoneNumber: value.phone, adults: adults, children: children })
  }

  const onChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dates) {
      const start = dates[0], end = dates[1]
      console.log('From: ', start, ', to: ', end);
      if (start != undefined && end != undefined) {
        setCurrentFromTime(start)
        setCurrentToTime(end)
      }
    } else {
      console.log('Clear');
    }
  };


  return (
    <div className="flex justify-center items-stretch">
      <Card style={{ width: "50%" }}>
        <RoomDetail {...roomInfo} />
      </Card >
      <Form labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }} className='self-center ml-8' name="booking_form" onFinish={handleSubmit} >
        <Card className='p-10'>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="range-picker" label="Date" {...rangeConfig}>
            <RangePicker onChange={onChange} disabledDate={(currentDate) => currentDate.isBefore(moment().startOf('date').toDate())} />
          </Form.Item>
          <Form.Item name="adults" label="Adult">
            <InputNumber defaultValue={1} onChange={(value) => setAdults(value || 0)} value={adults} min={1} max={2} />
          </Form.Item>
          <Form.Item name="children" label="Children">
            <InputNumber defaultValue={0} onChange={(value) => setChildren(value || 0)} value={children} min={0} max={4} />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item >
          <Form.Item {...tailFormItemLayout}>

            <Button shape='circle' type='primary' htmlType='submit' icon={<ArrowRightOutlined />}></Button>
          </Form.Item>
        </Card>
      </Form>
    </div>
  )
}

export default memo(BookingForm);