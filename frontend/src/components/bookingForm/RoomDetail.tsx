import { Statistic } from "antd";

import CarouselImage from "components/roomList/CarouselImage";
import { images } from "stores/constant";

export type RoomDetailInfo = {
  images?: any[],
  type?: any,
  description?: any,
  price?: any
}

const RoomDetail = (props: RoomDetailInfo | undefined) => {
  if (props === undefined) {
    return <></>
  }
  return (<div className="flex items-stretch">
    <CarouselImage images={images} />
    <div className="self-start m-4">
      <h2>Type</h2>
      <p className="capitalize">{props.type}</p>
      <h4>Description</h4>
      <p>{props.description}</p>
      <div className="rounded border-2 border-cyan-600 w-full m-4">
        <Statistic title="Price" value={props.price} prefix='$' suffix='/day'/>
      </div>
    </div>
  </div>)
}

export default RoomDetail;