const MAX_INSTRUCTION_LEN = 120;
const MAX_INGREDIENT_LEN = 100;

const RecipeCard = ({ recipe, onSelect, onDelete, isUserRecipe }) => {
  const {
    strMealThumb,
    strMeal,
    strArea,
    strCategory,
    strInstructions,
    name,
    ingredients,
    image,
  } = recipe;

  return (
    <article className="recipe-card" onClick={() => onSelect(recipe)}>
      <img
        src={isUserRecipe ? image : strMealThumb}
        alt={isUserRecipe ? name : strMeal}
        className="recipe-image"
        loading="lazy"
      />

      <div className="recipe-content">
        <div className="recipe-header">
          <h3 className="recipe-title">{isUserRecipe ? name : strMeal}</h3>
          {isUserRecipe && (
            <button
              className="recipe-delete-btn"
              onClick={(e) => {
                e.stopPropagation(); // prevents modal opening
                if (
                  window.confirm(
                    "Are you sure you want to delete this recipe? This action cannot be undone."
                  )
                ) {
                  onDelete(recipe.id);
                }
              }}
              aria-label="Delete recipe"
            >
              <i className="bi bi-trash3"></i>
            </button>
          )}
        </div>
        <p className="recipe-description">
          {isUserRecipe
            ? ingredients?.length > MAX_INGREDIENT_LEN
              ? `${ingredients.slice(0, MAX_INGREDIENT_LEN)}...`
              : ingredients || "No ingredients provided"
            : strInstructions?.slice(0, MAX_INSTRUCTION_LEN) ||
              "No instructions available"}
          ...
        </p>
        <div className="recipe-meta">
          <span className="tag">
            <i className="bi bi-geo-alt-fill"></i>{" "}
            {isUserRecipe ? recipe.area || "Unknown" : strArea}
          </span>
          <span className="tag">
            <i className="bi bi-tag-fill"></i>{" "}
            {isUserRecipe ? recipe.category || "Uncategorized" : strCategory}
          </span>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
