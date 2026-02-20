import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

const config = {};

export default function Meals() {
  const { data: meals, isLoading: loading, error } = useHttp("http://localhost:3000/meals", config, []);
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
