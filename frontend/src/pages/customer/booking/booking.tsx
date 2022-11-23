import Featured from "../../../components/featured/Featured";
// import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../../components/footer/Footer";
import MailList from "../../../components/mailList/MailList";
import Navbar from "../../../components/navbar/Navbar";
import PropertyList from "../../../components/propertyList/PropertyList";
import "./booking.css";
// import {getBooking} from '../../../../../backend/controllers/BookingController'

const Booking = () => {
    // const bookings = getBooking();
    // console.log(bookings);
    return (
    <div>
      <Navbar />
      {/* <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <MailList />
        <Footer />
      </div> */}
    </div>
  );
};

export default Booking;
