import LogIn from "pages/auth/LogIn";
import SignUp from "pages/auth/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
// import HomeCheck from './pages/customer/homeCheck/HomeCheck'


const AppCheck = () => {
  return (
    <BrowserRouter>
      <Routes>
          {/* <Route index path="/" element={<HomeCheck />} /> */}
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          {/* <Route path="*" element={<HomeCheck />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppCheck;
