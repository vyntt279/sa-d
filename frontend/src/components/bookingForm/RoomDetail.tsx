import CarouselImage from "components/roomList/CarouselImage";

export type RoomDetailInfo = {
  images?: any[],
  title?: any,
  description?: any,
}

const RoomDetail = (props: RoomDetailInfo | undefined) => {
  if (props === undefined) {
    return <></>
  }
  return (<>
    <CarouselImage images={props.images} />
    <p>{props.title}</p>
    <p>{props.description}</p>
  </>)
}

export default RoomDetail;