import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import FoodOrderProvider from "./store/food-order-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FoodOrderProvider>
      <App />
    </FoodOrderProvider>
  </React.StrictMode>,
);
