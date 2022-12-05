import { useEffect, useState } from "react"
import { Button, Popover, Tag } from "antd"

import { RoomCard } from 'components/roomList/RoomList'
import { url } from 'stores/constant'
import { render } from "@testing-library/react"

type RoomStatusProps = {
  roomNum: string
}

const RoomStatus = ({ roomNum }: RoomStatusProps) => {
  const [data, setData] = useState<RoomCard>();
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
  useEffect(() => {
    getRoomInfo()
  })

  const renderStatus = (status: string) => {
    var color = status == 'available' ? 'green' : 'geekblue';
    if (status === 'loser') {
      color = 'volcano';
    }
    return (
      <Tag color={color} key={status}>
        {status != undefined ? status.toUpperCase() : "UNDEFINED"}
      </Tag>
    );
  }

  return (<>
    <Popover content={data != undefined? (<div>
      Room type: {data?.type}
      <br />
      Price per day: {data?.price}
      <br />
      Room Number: {data?.roomNum}
      <br />
      Status: {renderStatus(data?.status)}
      <br />
    </div>) : "Cannot get information of this room"} title={`Room ${roomNum}`}>
      <Button >{roomNum}</Button>
    </Popover>
  </>)
}

export default RoomStatus;