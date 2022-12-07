import { Routes, Route } from "react-router-dom";

import LogIn from "pages/auth/LogIn";
import SignUp from "pages/auth/SignUp";
import RequireAuth from "pages/auth/RequireAuth";

import './App.css';
import Home from 'pages/customer/home/Home'
import BookList from "pages/customer/bookList/BookList";
import RoomList from "components/roomList/RoomList";
import MyLayout from "layouts/MyLayout";
import Booking from "pages/customer/booking/Booking";
import Receptionist from "pages/recept/booking/ViewBookings";
import Admin from "pages/admin/ViewRoom"

const ROLES = {
  'UNSPECIFIED': 0,
  'CUSTOMER': 'user',
  'ADMIN': 'admin',
  'RECEIPTIONIST': 'receptionist'
}

const App = () => {
  return (
    <Routes>
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<LogIn />} />
      <Route path="/" element={<MyLayout />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]} />}>
          <Route path="/" element={<Home />} />
          <Route path="bookings" element={<BookList />} />
          <Route path="rooms" element={<RoomList />} />
          <Route path="book-process/:roomNum" element={<Booking />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.RECEIPTIONIST]} />}>
          <Route path="/receptionist" element={<Receptionist />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App;