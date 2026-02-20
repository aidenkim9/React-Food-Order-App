import { useContext } from "react";
import { FoodOrderContext } from "../store/food-order-context";
import Modal from "./Modal";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
  const { totalPrice, items, addItem, deleteItem } = useContext(FoodOrderContext);
  const userProgressCtx = useContext(UserProgressContext);

  return (
    <Modal
      onClose={userProgressCtx.progress === "cart" ? userProgressCtx.hideCart : null}
      className="cart"
      open={userProgressCtx.progress === "cart"}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div className="cart-item">
              <p>
                {item.name} - {item.count} x ${item.price}
              </p>
              <p className="cart-item-actions">
                <button onClick={() => deleteItem(item.id)}>-</button>
                {item.count}
                <button onClick={() => addItem(item)}>+</button>
              </p>
            </div>
          </li>
        ))}
        <p className="cart-total">${totalPrice.toFixed(2)}</p>
        <p className="modal-actions">
          <button className="text-button" onClick={() => userProgressCtx.hideCart()}>
            Close
          </button>

          {items.length > 0 && (
            <button className="button" onClick={() => userProgressCtx.showCheckout()}>
              Go to Checkout
            </button>
          )}
        </p>
      </ul>
    </Modal>
  );
}
