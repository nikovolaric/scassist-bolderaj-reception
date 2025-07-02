import { useLocation } from "react-router";
import Header from "../components/Header";
import CartItems from "../features/checkout/CartItems";
import UserInfo from "../features/checkout/UserInfo";
import InvoiceAndPayment from "../features/checkout/InvoiceAndPayment";

function EndPurchase() {
  const { pathname } = useLocation();

  return (
    <div className="my-16 flex flex-col gap-20">
      <Header btnTo={pathname.split("/").slice(0, -1).join("/")} />
      <UserInfo />
      <CartItems />
      <InvoiceAndPayment />
    </div>
  );
}

export default EndPurchase;
