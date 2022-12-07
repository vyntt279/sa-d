import Featured from "components/featured/Featured";
import RoomList from "../../../components/roomList/RoomList";
import "./home.css";

const Home = () => {
  return (
    <div>
        <Featured />
        <h1 className="homeTitle">Others</h1>
        <RoomList />
    </div>
  );
};

export default Home;
