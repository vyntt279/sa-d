import { Button, Form, Modal } from "antd";
import SuccessfulBooking from "components/status/Successful";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const [open, setOpen] = useState(false);
  const handleSubmit = (values: any) => {
    setOpen(true)
  }
  const navigate = useNavigate();
  return <><Form onFinish={handleSubmit}>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Pay
      </Button>
      <Modal
        centered
        open={open}
        okText={'See Detail'}
        cancelText={'Go to Home'}
        onOk={() => navigate('/bookings')}
        onCancel={() => navigate('/')}
        width={500}
      >
        <SuccessfulBooking />
      </Modal>
    </Form.Item>
  </Form>
  </>
}
export default Payment;