import MainHeader from "./components/MainHeader";
import Meals from "./components/Meals";
import FoodOrderProvider from "./store/food-order-context";
import { UserProgressContextProvider } from "./store/UserProgressContext";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <UserProgressContextProvider>
      <FoodOrderProvider>
        <MainHeader />
        <Meals />
        <Cart />
        <Checkout />
      </FoodOrderProvider>
    </UserProgressContextProvider>
  );
}

export default App;
