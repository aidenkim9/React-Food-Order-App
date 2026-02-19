import { createContext, useReducer } from "react";

export const FoodOrderContext = createContext({
  totalPrice: null,
  items: [],
  addItem: () => {},
  deleteItem: () => {},
});

function foodOrderReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id);

    const updatedItems = [...state.items];

    if (existingItemIndex > -1) {
      const existingItem = updatedItems[existingItemIndex];
      const updatedItem = { ...existingItem, count: existingItem.count + 1 };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, count: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex((item) => item.id === action.id);

    if (existingItemIndex === -1) {
      return state;
    }

    const updatedItems = [...state.items];

    if (updatedItems[existingItemIndex].count === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = { ...updatedItems[existingItemIndex], count: updatedItems[existingItemIndex].count - 1 };
      updatedItems[existingItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }
  return state;
}

export default function FoodOrderProvider({ children }) {
  const [foodOrder, dispathAction] = useReducer(foodOrderReducer, { items: [] });

  let totalPrice = foodOrder.items.reduce((totalPrice, item) => {
    return (totalPrice += +item.price * item.count);
  }, 0);

  function addItem(item) {
    dispathAction({ type: "ADD_ITEM", item });
  }

  function deleteItem(id) {
    dispathAction({ type: "REMOVE_ITEM", id });
  }

  return (
    <FoodOrderContext.Provider value={{ totalPrice, items: foodOrder.items, addItem, deleteItem }}>
      {children}
    </FoodOrderContext.Provider>
  );
}
