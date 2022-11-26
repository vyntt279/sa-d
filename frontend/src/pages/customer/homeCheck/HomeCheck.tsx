import Checkin from "../../../components/checkin/Featured";
import Checkout from "../../../components/checkout/Featured";
// import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../../components/footer/Footer";
import MailList from "../../../components/mailList/MailList";
import NavbarChecking from "../../../components/navbarChecking/NavbarChecking";
import PropertyList from "../../../components/propertyList/PropertyList";
import "./homeCheck.css";

const HomeCheck = () => {
  return (
    <div>
      <NavbarChecking />
      <div className="homeContainer">
        <h1 className="checkInTitle">Check in</h1>
        <Checkin />
        <h1 className="checkOutTitle">Check out</h1>
        <Checkout />
        <div className="legger">
          <h1 className="Title">Happy, Patient!</h1>
          <span className="Desc">Be good to your customer</span>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeCheck;

