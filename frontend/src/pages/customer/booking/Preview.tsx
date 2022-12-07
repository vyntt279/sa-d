import { Descriptions, Button, Popover } from "antd";
import { ArrowRightOutlined } from '@ant-design/icons'
import { RoomDetailInfo } from "components/bookingForm/RoomDetail";
import { CustomerInfo } from "pages/customer/booking/Booking"
type PreviewBookingProps = {
  setFinishTab2: any,
  setActivateKey: any,
  totalCost: number,
  roomInfo: RoomDetailInfo | undefined,
  customerInfo: CustomerInfo,
  fromTime: string,
  toTime: string
}

const PreviewBooking = ({ customerInfo, roomInfo, setFinishTab2, setActivateKey, totalCost, fromTime, toTime }: PreviewBookingProps) => {
  const handleOnClick = () => {
    setFinishTab2(true)
    setActivateKey(3)
  }
  return (<div>
    <div className="flex mb-8">
      <Descriptions
        title="Room Information"
        bordered
        column={1}
      >
        <Descriptions.Item label="Type" className="capitalize">{roomInfo?.type}</Descriptions.Item>
        <Descriptions.Item label="Price per day" >${roomInfo?.price}</Descriptions.Item>
        <Descriptions.Item label="Description">
          <Popover content={roomInfo?.description} title={`Description`}>
            <Button >Detail</Button>
          </Popover>
        </Descriptions.Item>
        <Descriptions.Item label="Total Cost">${totalCost}</Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="Customer Information"
        bordered
        column={2}
        className='ml-8'
      >
        <Descriptions.Item label="Email">{customerInfo.email}</Descriptions.Item>
        <Descriptions.Item label="Phone number">+84 {customerInfo.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="Num of adults">{customerInfo.adults}</Descriptions.Item>
        <Descriptions.Item label="Num of children">{customerInfo.children}</Descriptions.Item>
        <Descriptions.Item label="Check In">{fromTime}</Descriptions.Item>
        <Descriptions.Item label="Check Out">{toTime}</Descriptions.Item>
      </Descriptions>
    </div>
    <Button shape='circle' type='primary' onClick={handleOnClick} icon={<ArrowRightOutlined />}></Button>
  </div>)
}

export default PreviewBooking;