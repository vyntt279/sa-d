import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import BookList from "pages/customer/bookList/BookList";
import RoomList from "pages/customer/roomList/RoomList";
import Home from "pages/customer/home/Home";
import "../pages/customer/home/home.css";

const Customer = () => {
  return (
    <div>
      {/* <Navbar />
      <div className="homeContainer">
        <BrowserRouter>
          <Routes>
            <Link index path="/" element={<Home />} />
            <Route path="rooms" element={<RoomList type={""} list={[]} />} />
            <Route path="bookings" element={<BookList />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div> */}
    </div>
  );
};

export default Customer;
