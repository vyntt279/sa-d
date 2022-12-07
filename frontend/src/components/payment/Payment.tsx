import { Button, Form, Modal, Input, DatePicker, Card } from "antd";
import SuccessfulBooking from "components/status/Successful";
import FailBooking from "components/status/FailBooking";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";

import { SuccessfulBookingProps } from 'components/status/Successful'
import MainScreen from ".";

type PaymentProps = {
  roomNum?: string,
  openStatus: boolean,
  status: string,
  book: any,
  successInfo: SuccessfulBookingProps,
}
const initialState = {
  cardNumber: '#### #### #### ####',
  cardHolder: 'FULL NAME',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
  isCardFlipped: false
};

const Payment = ({ successInfo, roomNum, book, openStatus, status }: PaymentProps) => {
  const handleSubmit = (values: any) => {
    book()
  }
  const navigate = useNavigate();
  return <>
    {/* <MainScreen /> */}
    <Form labelCol={{ span: 7 }}
      wrapperCol={{ span: 14 }} className='self-center ml-8' name="booking_form" onFinish={handleSubmit} >
      <Card className='p-10'>
        <Form.Item label="Card Number">
          <Input></Input>
        </Form.Item>
        <Form.Item label="Card Holder">
          <Input></Input>
        </Form.Item>
        <Form.Item label="Card Holder">
          <DatePicker picker="month" bordered={false} />
        </Form.Item>
        <Form.Item label="CVV">
          <Input></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Pay
          </Button>
        </Form.Item>
      </Card>
    </Form>

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
  </>
}
export default Payment;