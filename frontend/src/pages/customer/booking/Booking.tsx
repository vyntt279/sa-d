import { useState } from 'react'
import { Tabs, notification } from 'antd';
import { useParams } from 'react-router';
import BookingForm from 'components/bookingForm/BookingForm';
import Payment from 'components/payment/Payment';
import PreviewBooking from './Preview';
import { url, fetchData } from 'stores/constant';
import { SuccessfulBookingProps } from 'components/status/Successful';

const Booking = () => {
  const { roomNum } = useParams();
  const [activateTab, setActivateTab] = useState(1)
  const [finishTab1, setFinishTab1] = useState(false)
  const [finishTab2, setFinishTab2] = useState(false)
  const [successInfo, setSuccessInfo] = useState<SuccessfulBookingProps>({bookingId: "undefined", date: "undefined"})
  const [fromTime, setFromTime] = useState("")
  const [toTime, setToTime] = useState("")
  const [openStatus, setOpenStatus] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("undefined")
  const [status, setStatus] = useState("")

  const handleBooking = async () => {
    await fetch(url + "/bookings/create", {
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authorization')
      },
      method: "POST",
      body: JSON.stringify({
        roomNum: roomNum,
        fromTime: fromTime,
        toTime: toTime,
        status: "awaiting",
        paymentMethod: paymentMethod
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        if (response.error != undefined) {
          handleFailBooking(response)
        } else {
          handleSuccessfulBooking(response)
        }
      })
      .catch((reason) => {
        console.log(reason)
      })

  }

  const handleSuccessfulBooking = (response: any) => {
    setStatus("successful")
    setOpenStatus(true)
    setSuccessInfo({ bookingId: response.id, date: fromTime })
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
      children: <Payment successInfo={successInfo} roomNum={roomNum} status={status} openStatus={openStatus} setPaymentMethod={setPaymentMethod} book={handleBooking} />,
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