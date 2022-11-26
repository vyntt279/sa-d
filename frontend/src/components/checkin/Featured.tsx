import "./featured.css";
import RoomCard from "./RoomCard";

const Checkin = () => {
  return (
    <div className="featured">
      <RoomCard
        image={"https://cdn.cet.edu.vn/wp-content/uploads/2018/02/turndown-service-la-gi.jpg"}
        title={"TITLE"}
        subtitle={"Subtitle"}
      />

      <RoomCard
        image={"https://cdn.cet.edu.vn/wp-content/uploads/2018/02/turndown-service-la-gi.jpg"}
        title={"TITLE"}
        subtitle={"Subtitle"}
      />

      <RoomCard
        image={"https://cdn.cet.edu.vn/wp-content/uploads/2018/02/turndown-service-la-gi.jpg"}
        title={"TITLE"}
        subtitle={"Subtitle"}
      />
    </div>
  );
};

export default Checkin;
