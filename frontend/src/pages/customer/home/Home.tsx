import Featured from "components/featured/Featured";
import RoomList from "../../../components/roomList/RoomList";
// import PropertyList from "components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
        <h1 className="homeTitle">Hot rooms</h1>
        <Featured />
        <h1 className="homeTitle">Others</h1>
        <RoomList />
    </div>
  );
};

export default Home;
