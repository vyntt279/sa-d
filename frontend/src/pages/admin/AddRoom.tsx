import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons'
import {
  Modal, notification, Form,
  Input,
  Button,
  Select,
  InputNumber,
  Upload,
} from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

import { RoomInfo } from './ViewRoom';
import { url } from 'stores/constant'

const { TextArea } = Input;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AddRoom: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleCancel = () => setPreviewOpen(false);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

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
        type: values.type,
        status: "undefined",
        price: values.price.toString(),
        description: values.description,
        bookingId: "undefined",
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

        });
      })
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
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
              <Select.Option value="single">Single</Select.Option>
              <Select.Option value="double">Double</Select.Option>
              <Select.Option value="studio">Studio</Select.Option>
              <Select.Option value="duplex">Duplex</Select.Option>
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
          <Form.Item name="images" label="Upload" valuePropName="fileList" >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddRoom;