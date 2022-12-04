import { useState } from 'react'
import { Tabs, notification } from 'antd';
import { useParams } from 'react-router';
import BookingForm from 'components/bookingForm/BookingForm';
import Payment from 'components/payment/Payment';
import PreviewBooking from './Preview';
import { url, fetchData } from 'stores/constant';

const Booking = () => {
  const { roomNum } = useParams();
  const [activateTab, setActivateTab] = useState(1)
  const [finishTab1, setFinishTab1] = useState(false)
  const [finishTab2, setFinishTab2] = useState(false)
  const [fromTime, setFromTime] = useState("")
  const [toTime, setToTime] = useState("")
  const [openStatus, setOpenStatus] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [status, setStatus] = useState("")

  const handleBooking = async () => {
    // await fetchData("/bookings/create", {
    //   roomNum: "199",
    //   fromTime: fromTime,
    //   toTime: toTime,
    //   status: "",
    //   paymentMethod: paymentMethod
    // }, "POST", "Cannot book this room", true, handleSuccessfulBooking, undefined, handleFailBooking)
    await fetch(url + "/bookings/create", {
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('authorization')
      },
      method: "POST",
      body: JSON.stringify({
        roomNum: "199",
        fromTime: fromTime,
        toTime: toTime,
        status: "",
        paymentMethod: paymentMethod
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        handleSuccessfulBooking(response)
      })
      .catch((reason) => {
        handleFailBooking(reason)
        console.log(reason)
        notification.info({
          message: `Cannot log in, please try again`,
          placement: 'top',
        });
      })

  }

  const handleSuccessfulBooking = (response: any) => {
    setStatus("successful")
    setOpenStatus(true)
  }

  const handleFailBooking = (reason: any) => {
    setStatus("fail")
    setOpenStatus(true)
  }


  const handleTabClick = (key: string) => {
    setActivateTab(Number(key))
  }

  var tabData = [
    {
      label: 'Register Information',
      key: '1',
      children: <BookingForm roomNum={roomNum} activateTab={activateTab} setActivateKey={setActivateTab} setFinishTab1={setFinishTab1} setFromTime={setFromTime} setToTime={setToTime} />,

    },
    {
      label: 'Preview',
      key: '2',
      children: <PreviewBooking setActivateKey={setActivateTab} setFinishTab2={setFinishTab2} />,
      disabled: !finishTab1
    },
    {
      label: 'Payment',
      key: '3',
      children: <Payment roomNum={roomNum} status={status} openStatus={openStatus} setPaymentMethod={setPaymentMethod} book={handleBooking} />,
      disabled: !finishTab2
    }
  ]
  return (
    <Tabs
      activeKey={activateTab.toString()}
      centered
      items={tabData}
      onTabClick={(activateKey: string, _) => handleTabClick(activateKey)}
    />
  )
};

export default Booking;