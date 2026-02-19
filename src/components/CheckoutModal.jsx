import { useContext, useState } from "react";
import { FoodOrderContext } from "../store/food-order-context";
import Input from "./Input";

export default function CheckoutModal({ closeModal }) {
  const { totalPrice, items } = useContext(FoodOrderContext);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitting(true);

    try {
      const fd = new FormData(event.target);

      const name = fd.get("name");
      const email = fd.get("email");
      const street = fd.get("street");
      const postalCode = fd.get("postalCode");
      const city = fd.get("city");

      const order = { customer: { name, email, street, postalCode, city }, items };

      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data.");
      }

      closeModal();
    } catch (err) {
      setSubmitError(err.message || "Failed to submit order data.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="control">
      <h2>Checkout</h2>
      {submitError && <p>{submitError}</p>}
      <p>Total Amount: ${totalPrice.toFixed(2)}</p>
      <form onSubmit={handleSubmit}>
        <Input label="name" title="Full Name" />
        <Input label="email" title="E-mail Address" />
        <Input label="street" title="Street" />
        <div className="control-row-box">
          <Input label="postalCode" title="Postal Code" />
          <Input label="city" title="City" />
        </div>
        <p className="cart-action-buttons">
          <button className="cart-text-button" onClick={closeModal}>
            Close
          </button>
          <button className="button">{submitting ? "Submitting..." : "Submit Order"}</button>
        </p>
      </form>
    </div>
  );
}
