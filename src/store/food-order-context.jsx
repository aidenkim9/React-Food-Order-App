import { createContext, useState, useEffect } from "react";

export const FoodOrderContext = createContext({
  loading: true,
  error: null,
  totalPrice: null,
  meals: [],
  items: [],
  addItem: () => {},
  addItemCount: () => {},
  deleteItemCount: () => {},
});

export default function FoodOrderProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data = await response.json();

        setMeals(data);
      } catch (error) {
        setError(error.message || "Failed to fetch meals.");
      } finally {
        setLoading(false);
      }
    }

    getMeals();
  }, []);

  let totalPrice = 0;

  for (let item of items) {
    const sum = Number(item.price) * item.count;

    totalPrice += sum;
  }

  function addItem(id) {
    const addedMeal = meals.find((meal) => meal.id === id);

    setItems((prevItems) => {
      const copyItems = [...prevItems];

      if (!prevItems.find((item) => item.id === addedMeal.id)) {
        return [...prevItems, { id: addedMeal.id, name: addedMeal.name, price: addedMeal.price, count: 1 }];
      }

      const newItems = copyItems.map((item) => {
        if (item.id === addedMeal.id) {
          return { ...item, count: item.count + 1 };
        }
        return { ...item };
      });

      return newItems;
    });
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
      return prevItems
        .map((item) => {
          if (item.id === id) {
            return { ...item, count: item.count === 0 ? 0 : item.count - 1 };
          }
          return { ...item };
        })
        .filter((item) => item.count > 0);
    });
  }

  return (
    <FoodOrderContext.Provider
      value={{ loading, error, totalPrice, meals, items, addItem, addItemCount, deleteItemCount }}
    >
      {children}
    </FoodOrderContext.Provider>
  );
}
