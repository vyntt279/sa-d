import "./featured.css";
import CheckinCard from "./CheckinCard";

const Checkin = () => {
  return (
    <div className="featured">
      <CheckinCard
        image={"https://cdn.cet.edu.vn/wp-content/uploads/2018/02/turndown-service-la-gi.jpg"}
        title={"TITLE"}
        subtitle={"Subtitle"}
      />

      <CheckinCard
        image={"https://cdn.cet.edu.vn/wp-content/uploads/2018/02/turndown-service-la-gi.jpg"}
        title={"TITLE"}
        subtitle={"Subtitle"}
      />

      <CheckinCard
        image={"https://cdn.cet.edu.vn/wp-content/uploads/2018/02/turndown-service-la-gi.jpg"}
        title={"TITLE"}
        subtitle={"Subtitle"}
      />
    </div>
  );
};

export default Checkin;
