import { useNavigate } from "react-router-dom";
import { Button, Form, Input, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import jwt from 'jwt-decode';
import bg from 'assets/bg.jpg'
import { fetchData, url } from 'stores/constant'

const LogIn = () => {
  var navigate = useNavigate();
  const handleResponse = (response: any) => {
    console.log('Data', response)
    localStorage.setItem('authorization', response.token)

    navigate("/")
  }

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    // await fetchData("/users/login", {
    //   email: values.email,
    //   password: values.password
    // }, "POST", `Cannot log in, please try again`, false, handleResponse)
    await fetch(url + "/users/login", {
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('Data', response)
        localStorage.setItem('authorization', response.token)
        var decode: any = jwt(response.token)
        console.log('Check', decode["role"])
        switch (decode["role"]) {
          case "user": {
            navigate("/")
            break;
          }
          case "admin": {
            navigate("/admin")
            break;
          }
          case "receptionist": {
            navigate("/receptionist")
            break;
          }
        }
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
export default LogIn;