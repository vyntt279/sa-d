import { useState, useEffect } from 'react'
import { Tabs, notification } from 'antd';
import { useParams } from 'react-router';
import BookingForm from 'components/bookingForm/BookingForm';
import Payment from 'components/payment/Payment';
import PreviewBooking from './Preview';
import { url } from 'stores/constant';
import { SuccessfulBookingProps } from 'components/status/Successful';
import { RoomDetailInfo } from 'components/bookingForm/RoomDetail';

export type CustomerInfo = {
  email: string,
  phoneNumber: string,
  adults: number,
  children: number
}
const Booking = () => {
  const { roomNum } = useParams();
  const [activateTab, setActivateTab] = useState(1)
  const [finishTab1, setFinishTab1] = useState(false)
  const [finishTab2, setFinishTab2] = useState(false)
  const [successInfo, setSuccessInfo] = useState<SuccessfulBookingProps>({ bookingId: "undefined", date: "undefined" })
  const [fromTime, setFromTime] = useState("")
  const [toTime, setToTime] = useState("")
  const [openStatus, setOpenStatus] = useState(false)
  const [status, setStatus] = useState("")
  const [roomInfo, setRoomInfo] = useState<RoomDetailInfo>()
  const [totalCost, setTotalCost] = useState<number>(0)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({ email: localStorage.getItem('email') || "", phoneNumber: "", adults: 0, children: 0 })

  const getRoomInfo = async (roomNum: string) => {
    console.log('Room ID:', roomNum);
    await fetch(url + `/rooms/${roomNum}`, {
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setRoomInfo(response)
        console.log("Room info: ", response)
      })
      .catch((reason) => {
        console.log(reason)
        notification.info({
          message: `Cannot get the room info, please try again`,
        });
      })

  };

  useEffect(() => {
    if (roomNum != undefined) {
      getRoomInfo(roomNum)
    }
  }, [])

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
        status: "waiting",
        paymentMethod: "card",
        totalPrice: totalCost
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
      children: <BookingForm setCustomerInfo={setCustomerInfo} setTotalCost={setTotalCost} roomInfo={roomInfo} activateTab={activateTab} setActivateKey={setActivateTab} setFinishTab1={setFinishTab1} setFromTime={setFromTime} setToTime={setToTime} />,

    },
    {
      label: 'Preview',
      key: '2',
      children: <PreviewBooking fromTime={fromTime} toTime={toTime} customerInfo={customerInfo} roomInfo={roomInfo} totalCost={totalCost} setActivateKey={setActivateTab} setFinishTab2={setFinishTab2} />,
      disabled: !finishTab1
    },
    {
      label: 'Payment',
      key: '3',
      children: <Payment successInfo={successInfo} roomNum={roomNum} status={status} openStatus={openStatus} book={handleBooking} />,
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