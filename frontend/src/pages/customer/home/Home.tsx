import Featured from "components/featured/Featured";
import MailList from "components/mailList/MailList";
import PropertyList from "components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
    </div>
  );
};

export default Home;
