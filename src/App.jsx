import { useEffect, useState } from "react";
import MainHeader from "./components/MainHeader";
import Meals from "./components/Meals";

function App() {
  const [meals, setMeals] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getMeals() {
      const response = await fetch("http://localhost:3000/meals");
      const data = await response.json();

      setMeals(data);
    }

    getMeals();
  }, []);

  function addOrder(id) {
    const addedMeal = meals.find((meal) => meal.id === id);

    setOrders((prevOrders) => {
      const copyOrders = [...prevOrders];

      if (!prevOrders.find((order) => order.id === addedMeal.id)) {
        return [...prevOrders, { id: addedMeal.id, name: addedMeal.name, price: addedMeal.price, count: 1 }];
      }

      const newOrders = copyOrders.map((order) => {
        if (order.id === addedMeal.id) {
          return { ...order, count: order.count + 1 };
        }
        return { ...order };
      });

      return newOrders;
    });
  }

  return (
    <>
      <MainHeader items={orders} setItems={setOrders} />
      <Meals meals={meals} addOrder={addOrder} />
    </>
  );
}

export default App;
