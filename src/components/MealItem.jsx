export default function MealItem({ meal, addOrder }) {
  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt="meal img" />
        <h3>{meal.name}</h3>
        <div>
          <p className="meal-item-price">${meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
          <button className="meal-item-actions button" onClick={() => addOrder(meal.id)}>
            Add to Cart
          </button>
        </div>
      </article>
    </div>
  );
}
