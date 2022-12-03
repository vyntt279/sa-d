import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import bg from '../../assets/bg.jpg'
import { url } from 'stores/constant'
const SignUp = () => {
  var navigate = useNavigate();
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      +84
    </Form.Item>
  );
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    await fetch(url + "/users/register", {
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        phone: '0' + values.phone
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem('authorization', response.token)
        localStorage.setItem('role', '1')
        localStorage.setItem('username', values.email)
        navigate("/")
      })
      .catch((err) => {
        console.log(err.message);
      });
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
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Button type="link" href='/' size='large' icon={<ArrowLeftOutlined />} />
          <p className="form-title">Hello new friends</p>
          <p>Sign up to the BookingHotel</p>
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
          <Form.Item
            name="phone"
            label="Phone number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>


          <Form.Item
            name="fullName"
            label="Name"
          >
            <Input
              placeholder="Full name"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              SIGN UP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  );
};
export default SignUp;