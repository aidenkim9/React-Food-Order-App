import { useRef } from "react";
import mainLogo from "../assets/logo.jpg";
import Modal from "./Modal";

export default function MainHeader({ items, setItems }) {
  const cartModal = useRef();
  const checkoutModal = useRef();

  let totalPrice = 0;

  for (let item of items) {
    const sum = Number(item.price) * item.count;

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

  function addItemCount(id) {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, count: item.count + 1 };
        }
        return { ...item };
      });
    });
  }

  function deleteItemCount(id) {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, count: item.count === 0 ? 0 : item.count - 1 };
        }
        return { ...item };
      });
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);

    const name = fd.get("name");
    const email = fd.get("email");
    const street = fd.get("street");
    const postalCode = fd.get("postalCode");
    const city = fd.get("city");

    const order = { customer: { name, email, street, postalCode, city }, items };

    console.log(order);

    await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order }),
    });
  }

  return (
    <header id="main-header">
      <Modal ref={cartModal}>
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
                    <button onClick={() => deleteItemCount(item.id)}>-</button>
                    {item.count}
                    <button onClick={() => addItemCount(item.id)}>+</button>
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
          <form onSubmit={handleSubmit}>
            <p className="control-row">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" />
            </p>
            <p className="control-row">
              <label htmlFor="email">E-mail Address</label>
              <input type="text" id="email" name="email" />
            </p>
            <p className="control-row">
              <label htmlFor="street">Street</label>
              <input type="text" id="street" name="street" />
            </p>
            <div className="control-row-box">
              <p className="control-row">
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" id="postalCode" name="postalCode" />
              </p>
              <p className="control-row">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" />
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
        Cart ({items.length})
      </button>
    </header>
  );
}
