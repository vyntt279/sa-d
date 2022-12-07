import { DatePicker, Form, Input, Checkbox, InputNumber, notification, Button, Card } from 'antd';
import { useEffect, useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons'


import RoomDetail, { RoomDetailInfo } from './RoomDetail';
import { url } from 'stores/constant'
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
  roomNum: string | undefined,
  activateTab: number,
  setActivateKey: any,
  setFinishTab1: any,
  setToTime: any, 
  setFromTime: any
}

const BookingForm = ({ roomNum, activateTab, setActivateKey, setFinishTab1, setFromTime, setToTime }: BookingFormProps) => {
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      +84
    </Form.Item>
  );

  const [roomInfo, setRoomInfo] = useState<RoomDetailInfo>()
  const [currentFromTime, setCurrentFromTime] = useState("")
  const [currentToTime, setCurrentToTime] = useState("")

  const getRoomInfo = async (roomNum: string) => {
    console.log('Room ID:', roomNum);
    await fetch(url + `/rooms/${roomNum}`, {
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setRoomInfo(response)
        console.log("Room info: ", response)
      })
      .catch((reason) => {
        console.log(reason)
        notification.info({
          message: `Cannot get the room info, please try again`,
        });
      })

  };

  useEffect(() => {
    if (roomNum != undefined) {
      getRoomInfo(roomNum)
    }
  }, [])

  const handleSubmit = (value: any) => {
    console.log('Submit')
    setActivateKey(activateTab + 1)
    setFinishTab1(true)
    setFromTime(currentFromTime)
    setToTime(currentToTime)
  }

  const onChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dates) {
      const start = dates[0], end = dates[1]
      console.log('From: ', start, ', to: ', end);
      if (start != undefined && end != undefined) {
        setCurrentFromTime(start.toString())
        setCurrentToTime(end.toString())
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
      <Form className='self-center ml-8' name="booking_form" onFinish={handleSubmit}>
        <Card className='p-10'>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="range-picker" label="Date" {...rangeConfig}>
            <RangePicker onChange={onChange} disabledDate={(currentDate) => currentDate.isBefore(moment().startOf('date').toDate())}/>
          </Form.Item>
          <Form.Item label="Adult">
            <Form.Item name="adult" noStyle>
              <InputNumber min={1} max={2} />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Children">
            <Form.Item name="children" noStyle>
              <InputNumber min={0} max={4} />
            </Form.Item>
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

export default BookingForm;