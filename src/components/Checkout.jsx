import { useContext, useState } from "react";
import { FoodOrderContext } from "../store/food-order-context";
import Input from "./Input";
import Modal from "./Modal";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { totalPrice, items } = useContext(FoodOrderContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, isLoading, error, sendRequest } = useHttp("http://localhost:3000/orders", config);

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const order = { customer: formData, items };

    sendRequest(JSON.stringify({ order }));
  }

  return (
    <Modal onClose={userProgressCtx.hideCheckout} open={userProgressCtx.progress === "checkout"}>
      <h2>Checkout</h2>
      {error && <p>{error}</p>}
      <p>Total Amount: ${totalPrice.toFixed(2)}</p>
      <form onSubmit={handleSubmit}>
        <Input label="name" title="Full Name" />
        <Input label="email" title="E-mail Address" />
        <Input label="street" title="Street" />
        <div className="control-row">
          <Input label="postalCode" title="Postal Code" />
          <Input label="city" title="City" />
        </div>
        <p className="cart-action-buttons">
          <button type="button" className="cart-text-button" onClick={() => userProgressCtx.hideCheckout()}>
            Close
          </button>
          <button className="button">{isLoading ? "Submitting..." : "Submit Order"}</button>
        </p>
      </form>
    </Modal>
  );
}
