import { useContext } from "react";
import mainLogo from "../assets/logo.jpg";
import { FoodOrderContext } from "../store/food-order-context";
import Cart from "./Cart";
import Checkout from "./Checkout";
import UserProgressContext from "../store/UserProgressContext";

export default function MainHeader() {
  const { items } = useContext(FoodOrderContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalItems = items.reduce((totalCount, item) => {
    return (totalCount += item.count);
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={mainLogo} alt="title img" />
        <h1>REACTFOOD</h1>
      </div>
      <button className="text-button" onClick={handleShowCart}>
        Cart ({totalItems})
      </button>
    </header>
  );
}
