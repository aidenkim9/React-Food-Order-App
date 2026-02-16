import MealItem from "./MealItem";

export default function Meals({ meals, addOrder }) {
  return (
    <ul id="meals">
      {meals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} addOrder={addOrder} />;
      })}
    </ul>
  );
}
