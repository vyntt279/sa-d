import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "antd";
import Cards from 'react-credit-cards';
import SuccessfulBooking from "components/status/Successful";
import FailBooking from "components/status/FailBooking";

import { SuccessfulBookingProps } from 'components/status/Successful'

type PaymentProps = {
  roomNum?: string,
  openStatus: boolean,
  setPaymentMethod: any,
  status: string,
  book: any,
  successInfo: SuccessfulBookingProps,
}

type CreditCard = {
  cvc: string,
  expiry: string,
  focus: string,
  name: string,
  number: string,
}

const Payment = ({ successInfo, roomNum, book, openStatus, status }: PaymentProps) => {
  const handleSubmit = (values: any) => {
    book()
  }
  const [cardInfo, setCardInfo] = useState<CreditCard>({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  })
  const navigate = useNavigate();
  return <><Form onFinish={handleSubmit}>
    <Cards
      cvc={cardInfo.cvc}
      expiry={cardInfo.expiry}
      // focused={cardInfo.focus}
      name={cardInfo.name}
      number={cardInfo.number}
    />
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