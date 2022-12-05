import { Button, Form, Modal } from "antd";
import SuccessfulBooking from "components/status/Successful";
import FailBooking from "components/status/FailBooking";
import { useNavigate } from "react-router-dom";

import { SuccessfulBookingProps } from 'components/status/Successful'

type PaymentProps = {
  roomNum?: string,
  openStatus: boolean,
  setPaymentMethod: any,
  status: string,
  book: any,
  successInfo: SuccessfulBookingProps,
}

const Payment = ({ successInfo, roomNum, book, openStatus, setPaymentMethod, status }: PaymentProps) => {
  const handleSubmit = (values: any) => {
    setPaymentMethod("Card")
    book()
  }
  const navigate = useNavigate();
  return <><Form onFinish={handleSubmit}>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Pay
      </Button>
      <Modal
        centered
        open={openStatus}
        okText={status === "successful" ? 'See Detail' : 'Try again'}
        cancelText={'Go to Home'}
        onOk={() => navigate(status === "successful" ? '/bookings' : `/book-process/${roomNum}`)}
        onCancel={() => navigate('/')}
        width={500}
      >
        {status === "successful" ? <SuccessfulBooking {...successInfo} /> : <FailBooking />}
      </Modal>
    </Form.Item>
  </Form>
  </>
}
export default Payment;