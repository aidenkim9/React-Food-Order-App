import { useRef, useContext } from "react";
import mainLogo from "../assets/logo.jpg";
import Modal from "./Modal";
import { FoodOrderContext } from "../store/food-order-context";
import CartModal from "./CartModal";
import CheckoutModal from "./CheckoutModal";

export default function MainHeader() {
  const { items } = useContext(FoodOrderContext);

  const cartModal = useRef();
  const checkoutModal = useRef();

  const totalItems = items.reduce((totalCount, item) => {
    return (totalCount += item.count);
  }, 0);

  function showModal(modal) {
    modal.current.showModal();
  }
  function closeModal(modal) {
    modal.current.close();
  }

  return (
    <header id="main-header">
      <Modal ref={cartModal}>
        <CartModal
          closeModal={() => closeModal(cartModal)}
          showModal={() => {
            closeModal(cartModal);
            showModal(checkoutModal);
          }}
          items={items}
        />
      </Modal>
      <Modal ref={checkoutModal}>
        <CheckoutModal closeModal={() => closeModal(checkoutModal)} />
      </Modal>
      <div id="title">
        <img src={mainLogo} alt="title img" />
        <h1>REACTFOOD</h1>
      </div>
      <button className="text-button" onClick={() => showModal(cartModal)}>
        Cart ({totalItems})
      </button>
    </header>
  );
}
