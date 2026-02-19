import { useContext } from "react";
import { FoodOrderContext } from "../store/food-order-context";

export default function CartModal({ closeModal, showModal, items }) {
  const { totalPrice, addItem, deleteItem } = useContext(FoodOrderContext);
  return (
    <div className="cart">
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
        <p className="cart-action-buttons">
          <button className="cart-text-button" onClick={closeModal}>
            Close
          </button>
          <button className="button" onClick={showModal}>
            Go to Checkout
          </button>
        </p>
      </ul>
    </div>
  );
}
