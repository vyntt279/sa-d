import { Outlet } from "react-router-dom";
import Footer from "components/footer/Footer";
import Navbar from "components/navbar/Navbar";
import MailList from "components/mailList/MailList";
import "pages/customer/home/home.css";

const MyLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="homeContainer">
        <main>
          <Outlet />
        </main>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default MyLayout;
