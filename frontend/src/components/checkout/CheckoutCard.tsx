import { Button, Modal } from "antd";

import { useState } from 'react';

import "./featured2.css";

type RoomCardProps = {
  image: string,
  title: string,
  subtitle: string
}

const CheckoutCard = (props: RoomCardProps) => {
  const [modal2Open, setModal2Open] = useState(false);
  const { image, title, subtitle } = props

  return (
    <div className="featuredItem2">
      <img
        src={image}
        alt=""
        className="featuredImg2"
      />
      <div className="featuredTitles2">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <Button type="primary" onClick={() => setModal2Open(true)}>
          Check out
        </Button>
        
      </div>
    </div>
  )
}

export default CheckoutCard;