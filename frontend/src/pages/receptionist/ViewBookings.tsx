import { useNavigate } from "react-router-dom";
import { Button, Form, Input, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import bg from '../../assets/bg.jpg'
import { url } from 'stores/constant'
import "./ViewBooking.css";
import React, { useState } from 'react';
import { InputNumber, Popconfirm, Table, Typography } from 'antd';


const ViewBooking = () => {
  var navigate = useNavigate();
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    // TO DO: Call API message and receive value
    await fetch(url + "/bookings/getBooking", {
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET",
      body: JSON.stringify({
        no: values.number,
        email: values.string,
        name: values.string,
        roomtype: values.string,
        roomNo: values.number,
        start: values.string,
        end: values.string,
        price: values.number,
        status: values.string
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('Data', response)

        localStorage.setItem('no', values.number)
        localStorage.setItem('email', values.string)
        localStorage.setItem('name', values.string)
        localStorage.setItem('roomtype', values.string)
        localStorage.setItem('roomNo', values.number)
        localStorage.setItem('start', values.string)
        localStorage.setItem('end', values.string)
        localStorage.setItem('price', values.number)
        localStorage.setItem('status', values.string)

        var no = localStorage.getItem('no');
        localStorage.getItem('email')
        localStorage.getItem('name')
        localStorage.getItem('roomtype')
        localStorage.getItem('roomNo')
        localStorage.getItem('start')
        localStorage.getItem('end')
        localStorage.getItem('price')
        localStorage.getItem('status')
        navigate("/")
      })
      .catch((reason) => {
        console.log(reason)
        notification.info({
          message: `Cannot log in, please try again`,
          placement: 'top',
        });
      })
    
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={bg} alt="Login" />
        </div>
        <Form
          name="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Button type="link" href='/' size='large' icon={<ArrowLeftOutlined />} />
          <p className="form-title">Welcome back</p>
          <p>Login to the BookingHotel</p>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};







//-----------------------------------------------------------------------------------------------------------








interface Booking {
  key: string;
  name: string;
  age: number;
  address: string;
}
interface DataType {
    no: number;
    email: string;
    name: string;
    roomtype: string;
    roomNo: number;
    start: string;
    end: string;
    price: number;
    status: string[];
}

const originData: Booking[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
// interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
//   editing: boolean;
//   dataIndex: string;
//   title: any;
//   inputType: 'number' | 'text';
//   record: Booking;
//   index: number;
//   children: React.ReactNode;
// }

// const EditableCell: React.FC<EditableCellProps> = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{ margin: 0 }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Booking) => record.key === editingKey;

  const edit = (record: Partial<Booking> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Booking;

      const newData = [...data];
      const index = newData.findIndex((Booking) => key === Booking.key);
      if (index > -1) {
        const Booking = newData[index];
        newData.splice(index, 1, {
          ...Booking,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      padding: '40px',
      render: (_: any, record: Booking) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ fontSize: 20, marginRight: 10 }}>
              Checkin
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Checkout</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Booking) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            // cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default App;