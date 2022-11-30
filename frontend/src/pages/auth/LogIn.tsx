import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import bg from '../../assets/bg.jpg'
import useAuth from 'hooks/useAuth';

const LogIn = () => {
  var navigate = useNavigate();
  const { setAuth, setUser } = useAuth()

  const onFinish = (values: any) => {
    console.log('Success:', values);
    // TO DO: Call API message and receive value
    // setAuth({ role: 1, token: '' })
    // setUser({ username: values.username })
    localStorage.setItem('role', '1')
    localStorage.setItem('username', values.username)
    navigate("/")
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
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
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
export default LogIn;