import LogIn from "pages/auth/LogIn";
import SignUp from "pages/auth/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Home from './pages/customer/home/Home'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
