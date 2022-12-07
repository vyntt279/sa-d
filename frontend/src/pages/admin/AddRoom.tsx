import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons'
import {
  Modal, notification, Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from 'antd';

import { RoomInfo } from './ViewRoom';
import { url } from 'stores/constant'

const { TextArea } = Input;
const AddRoom: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleAddRoom = async (values: any) => {
    console.log(values)
    await fetch(url + "/rooms/create", {
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authorization')
      },
      method: "POST",
      body: JSON.stringify({
        roomNum: values.roomNum,
        bookingId: values.bookingId,
        type: values.type,
        status: values.status,
        price: values.price,
        description: values.description
      })
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('Data', response)
      })
      .catch((reason) => {
        console.log(reason)
        notification.info({
          message: `Cannot get all rooms, please try again`,
          placement: 'top',
        });
      })
  }
  return (
    <>
      <Button type="primary" shape='circle' onClick={() => setOpen(true)} icon={<PlusOutlined />} />
      <Modal
        title="New Room Information"
        centered
        open={open}
        okText="Save"
        onCancel={() => setOpen(false)}
        width={"40%"}
        footer={[
          <Button type="primary" form="new-room" key="submit" htmlType="submit">
            Submit
          </Button>
        ]}
      >
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          className='mt-4'
          onFinish={handleAddRoom}
          name="new-room"
        >
          <Form.Item name="roomNum" label="Room Number" rules={[
            {
              required: true,
              message: 'Please input the room number!',
            },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[
            {
              required: true,
              message: 'Please choose the room type!',
            },
          ]}>
            <Select>
              <Select.Option value="demo1">Demo1</Select.Option>
              <Select.Option value="demo2">Demo2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[
            {
              required: true,
              message: 'Please input the price!',
            },
          ]}>
            <InputNumber prefix="$" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="images" label="Upload" valuePropName="fileList">
            <Upload action="" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddRoom;