import { Button, Modal } from "antd";
import BookingForm from "components/bookingForm/BookingForm";
import { useState } from 'react';

import "./featured.css";

type RoomCardProps = {
  image: string,
  title: string,
  subtitle: string
}

const RoomCard = (props: RoomCardProps) => {
  const [modal2Open, setModal2Open] = useState(false);
  const { image, title, subtitle } = props

  return (
    <div className="featuredItem">
      <img
        src={image}
        alt=""
        className="featuredImg"
      />
      <div className="featuredTitles">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <Button type="primary" onClick={() => setModal2Open(true)}>
          Book now
        </Button>
        <Modal
          title="Booking Form"
          centered
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
        >
          <BookingForm />
        </Modal>
      </div>
    </div>
  )
}

export default RoomCard;