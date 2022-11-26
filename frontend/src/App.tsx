import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogIn from "pages/auth/LogIn";
import SignUp from "pages/auth/SignUp";
import Customer from "layouts/customer";
import BookList from "pages/customer/bookList/BookList";
import RoomList from "pages/customer/roomList/RoomList";

import './App.css';
import Home from './pages/customer/home/Home'
// import Booking from "pages/customer/booking/booking";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="rooms" element={<RoomList type={""} list={[]}/>} />
        <Route path="bookings" element={<BookList />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
