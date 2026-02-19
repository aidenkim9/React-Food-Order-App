import { useContext } from "react";
import MealItem from "./MealItem";
import { FoodOrderContext } from "../store/food-order-context";

export default function Meals() {
  const { loading, meals } = useContext(FoodOrderContext);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <ul id="meals">
          {meals.map((meal) => {
            return <MealItem key={meal.id} meal={meal} />;
          })}
        </ul>
      )}
    </>
  );
}
