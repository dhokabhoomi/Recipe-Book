import RecipeCard from "./RecipeCard";

const FeaturedRecipes = ({ recipes, loading, error, onSelect }) => {
  return (
    <section className="recipes-section fade-in">
      <h2 className="recipes-section__title">Featured Recipes</h2>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner" />
          <span style={{ marginLeft: "1rem" }}>
            Loading featured recipes...
          </span>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="empty-state-icon">Error</div>
          <p>{error}</p>
        </div>
      ) : recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((meal) => (
            <RecipeCard
              key={`api-${meal.idMeal}`}
              recipe={meal}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No featured recipes available at the moment.</p>
        </div>
      )}
    </section>
  );
};
export default FeaturedRecipes;
