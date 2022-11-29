import "./featured2.css";
import CheckoutCard from "./CheckoutCard";

const Checkout = () => {
  return (
    <div className="featured2">
      <CheckoutCard
        image={"https://vcdn1-dulich.vnecdn.net/2022/07/29/hypat-1659069584-1659081355.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=ateHKAAnu32uybgAOx-emA"}
        title={"TITLE"}
        subtitle={"Subtitle"}
      />

      <CheckoutCard
        image={"https://vcdn1-dulich.vnecdn.net/2022/07/29/hypat-1659069584-1659081355.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=ateHKAAnu32uybgAOx-emA"}
        title={"TITLE"}
        subtitle={"Subtitle"}
      />

      <CheckoutCard
        image={"https://vcdn1-dulich.vnecdn.net/2022/07/29/hypat-1659069584-1659081355.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=ateHKAAnu32uybgAOx-emA"}
        title={"TITLE"}
        subtitle={"Subtitle"}
      />
    </div>
  );
};

export default Checkout;
