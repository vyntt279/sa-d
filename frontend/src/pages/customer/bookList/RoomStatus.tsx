import { useState, memo } from "react"
import { Button, Popover, Tag } from "antd"

import { RoomCard } from 'components/roomList/RoomList'
import { url } from 'stores/constant'

type RoomStatusProps = {
  roomNum: string
}

const RoomStatus = ({ roomNum }: RoomStatusProps) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<RoomCard>();

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    getRoomInfo()
    setOpen(newOpen);
  };

  const getRoomInfo = async () => {
    await fetch(url + `/rooms/${roomNum}`, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET"
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error == undefined) {
          setData(res)
        }
      });
  }

  const renderData = () => {
    return data != undefined ? (<div>
      Room type: {data?.type}
      <br />
      Price per day: {data?.price}
      <br />
    </div>) : "Cannot get information of this room"
  }

  return (<>
    <Popover content={renderData()} title={`Room ${roomNum}`}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange }
    >
      <Button >{roomNum}</Button>
    </Popover>
  </>)
}

export default memo(RoomStatus);