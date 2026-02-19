import { useState, useEffect } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
