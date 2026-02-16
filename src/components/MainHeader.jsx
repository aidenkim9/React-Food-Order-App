import { useRef } from "react";
import mainLogo from "../assets/logo.jpg";
import Modal from "./Modal";

export default function MainHeader({ orders, setOrders }) {
  const cartModal = useRef();
  const checkoutModal = useRef();

  let totalPrice = 0;

  for (let order of orders) {
    const sum = Number(order.price) * order.count;

    totalPrice += sum;
  }

  function showCartModal() {
    cartModal.current.showModal();
  }
  function closeCartModal() {
    cartModal.current.close();
  }
  function showCheckoutModal() {
    closeCartModal();
    checkoutModal.current.showModal();
  }
  function closeCheckoutModal() {
    checkoutModal.current.close();
  }

  function addOrderCount(id) {
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === id) {
          return { ...order, count: order.count + 1 };
        }
        return { ...order };
      });
    });
  }

  function deleteOrderCount(id) {
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === id) {
          return { ...order, count: order.count === 0 ? 0 : order.count - 1 };
        }
        return { ...order };
      });
    });
  }

  return (
    <header id="main-header">
      <Modal ref={cartModal}>
        <div className="cart">
          <h2>Your Cart</h2>
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <div className="cart-item">
                  <p>
                    {order.name} - {order.count} x ${order.price}
                  </p>
                  <p className="cart-item-actions">
                    <button onClick={() => deleteOrderCount(order.id)}>-</button>
                    {order.count}
                    <button onClick={() => addOrderCount(order.id)}>+</button>
                  </p>
                </div>
              </li>
            ))}
            <p className="cart-total">${totalPrice.toFixed(2)}</p>
            <p className="cart-action-buttons">
              <button className="cart-text-button" onClick={closeCartModal}>
                Close
              </button>
              <button className="button" onClick={showCheckoutModal}>
                Go to Checkout
              </button>
            </p>
          </ul>
        </div>
      </Modal>
      <Modal ref={checkoutModal}>
        <div className="control">
          <h2>Checkout</h2>
          <p>Total Amount: ${totalPrice.toFixed(2)}</p>
          <form action="">
            <p className="control-row">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" />
            </p>
            <p className="control-row">
              <label htmlFor="email">E-mail Address</label>
              <input type="text" id="email" />
            </p>
            <p className="control-row">
              <label htmlFor="street">Street</label>
              <input type="text" id="street" />
            </p>
            <div className="control-row-box">
              <p className="control-row">
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" id="postalCode" />
              </p>
              <p className="control-row">
                <label htmlFor="city">City</label>
                <input type="text" id="city" />
              </p>
            </div>
            <p className="cart-action-buttons">
              <button className="cart-text-button" onClick={closeCheckoutModal}>
                Close
              </button>
              <button className="button">Submit Order</button>
            </p>
          </form>
        </div>
      </Modal>
      <div id="title">
        <img src={mainLogo} alt="title img" />
        <h1>REACTFOOD</h1>
      </div>

      <button className="text-button" onClick={showCartModal}>
        Cart ({orders.length})
      </button>
    </header>
  );
}
