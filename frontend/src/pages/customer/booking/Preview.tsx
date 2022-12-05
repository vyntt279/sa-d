import { Descriptions, Button } from "antd";
import { ArrowRightOutlined } from '@ant-design/icons'
type PreviewBookingProps = {
  setFinishTab2: any,
  setActivateKey: any
}

const PreviewBooking = ({ setFinishTab2, setActivateKey }: PreviewBookingProps) => {
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
        <Descriptions.Item label="Type">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Price per day">$80.00</Descriptions.Item>
        <Descriptions.Item label="Description">
        </Descriptions.Item>
        <Descriptions.Item label="Total Cost">a</Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="Customer Information"
        bordered
        column={2}
        className='ml-8'
      >
        <Descriptions.Item label="Email">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Phone number">0814726878</Descriptions.Item>
        <Descriptions.Item label="Num of adults">1</Descriptions.Item>
        <Descriptions.Item label="Num of children">1</Descriptions.Item>
        <Descriptions.Item label="Check In">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Check Out">$80.00</Descriptions.Item>
      </Descriptions>
    </div>
    <Button shape='circle' type='primary' onClick={handleOnClick} icon={<ArrowRightOutlined />}></Button>
  </div>)
}

export default PreviewBooking;