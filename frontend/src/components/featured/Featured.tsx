import "./featured.css";
import RoomCard from "./RoomCard";

const Featured = () => {
  return (
    <div className="featured">
      <RoomCard
        image={"https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="}
        title={"TITLE"}
        subtitle={"Subtitle"}
      />

      <RoomCard
        image={"https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="}
        title={"TITLE"}
        subtitle={"Subtitle"}
      />

      <RoomCard
        image={"https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="}
        title={"TITLE"}
        subtitle={"Subtitle"}
      />
    </div>
  );
};

export default Featured;
