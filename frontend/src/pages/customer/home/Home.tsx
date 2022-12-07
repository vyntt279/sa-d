import { Divider } from 'antd'
import Featured from "components/featured/Featured";
import RoomList from "components/roomList/RoomList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Featured />
      <Divider orientation="left" plain>
        <h1 className="ml-3 text-4xl tracking-wider comforta font-bold" >Available Rooms</h1>
      </Divider>
      <RoomList />
    </div>
  );
};

export default Home;
