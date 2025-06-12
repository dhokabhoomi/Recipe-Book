const MAX_INSTRUCTION_LEN = 120;
const MAX_INGREDIENT_LEN = 100;

const RecipeCard = ({ recipe, onSelect, isUserRecipe }) => {
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
        <h3 className="recipe-title">{isUserRecipe ? name : strMeal}</h3>
        <p className="recipe-description">
          {isUserRecipe
            ? ingredients?.length > MAX_INGREDIENT_LEN
              ? `${ingredients.slice(0, MAX_INGREDIENT_LEN)}...`
              : ingredients || "No ingredients provided"
            : strInstructions?.slice(0, MAX_INSTRUCTION_LEN) ||
              "No instructions available"}
          ...
        </p>
        {!isUserRecipe && (
          <div className="recipe-meta">
            <span className="tag">
              <i className="bi bi-geo-alt-fill"></i> {strArea}
            </span>
            <span className="tag">
              <i className="bi bi-tag-fill"></i> {strCategory}
            </span>
          </div>
        )}
      </div>
    </article>
  );
};

export default RecipeCard;
