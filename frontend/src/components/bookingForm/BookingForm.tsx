import { DatePicker, Form, Input, Checkbox, notification, Button } from 'antd';
import { useEffect, useState } from 'react';
import RoomDetail, { RoomDetailInfo } from './RoomDetail';
import { url } from 'stores/constant'

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
  id: string | undefined
  setFinish: any
}

const BookingForm = ({ id, setFinish }: BookingFormProps) => {
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      +84
    </Form.Item>
  );

  const [roomInfo, setRoomInfo] = useState<RoomDetailInfo>()

  const getRoomInfo = async (id: string) => {
    console.log('Room ID:', id);
    await fetch(url + "/users/login", {
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        // email: values.email,
        // password: values.password
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setRoomInfo(response)
      })
      .catch((reason) => {
        console.log(reason)
        notification.info({
          message: `Cannot get the room info, please try again`,
          placement: 'top',
        });
      })

  };

  useEffect(() => {
    if (id != undefined) {
      getRoomInfo(id)
    }
  }, [])

  const handleSubmit = () => {
    console.log('Submit')
    setFinish(true)
  }

  return (
    <Form name="booking_form" onFinish={handleSubmit}>
      <RoomDetail {...roomInfo} />
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="range-picker" label="Date" {...rangeConfig}>
        <RangePicker />
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
      </Form.Item>
      <Form.Item>

        <Button type='primary' htmlType='submit'>Next</Button>
      </Form.Item>
    </Form>
  )
}

export default BookingForm;