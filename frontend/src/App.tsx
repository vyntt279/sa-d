import { Routes, Route } from "react-router-dom";

import LogIn from "pages/auth/LogIn";
import SignUp from "pages/auth/SignUp";
import RequireAuth from "pages/auth/RequireAuth";

import './App.css';
import Home from 'pages/customer/home/Home'
import BookList from "pages/customer/bookList/BookList";
import RoomList from "pages/customer/roomList/RoomList";
import MyLayout from "layouts/MyLayout";

const ROLES = {
  'UNSPECIFIED': 0,
  'CUSTOMER': 1,
  'ADMIN': 2,
  'RECEIPTIONIST': 3
}

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="/" element={<MyLayout />}>
        <Route path="/" element={<Home />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]} />}>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="bookings" element={<BookList />} />
          <Route path="rooms" element={<RoomList />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>

        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.RECEIPTIONIST]} />}>
        </Route>
      </Route>
    </Routes>
  )
}

export default App;