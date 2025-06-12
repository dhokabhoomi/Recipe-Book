import "./RecipeModal.css";

function RecipeModal({ recipe, onClose, onDelete }) {
  if (!recipe) return null;

  function getIngredientsList(recipe) {
    // Handle user-created recipes (ingredients as string)
    if (recipe.ingredients && typeof recipe.ingredients === "string") {
      return recipe.ingredients
        .split("\n")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient.length > 0);
    }

    // Handle API recipes (ingredients as separate properties)
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        const measureText = measure && measure.trim() ? measure.trim() : "";
        const ingredientText = ingredient.trim();
        ingredients.push(
          measureText ? `${measureText} ${ingredientText}` : ingredientText
        );
      }
    }
    return ingredients.length > 0 ? ingredients : ["No ingredients available"];
  }

  function renderInstructions(instructions) {
    if (!instructions || instructions.trim() === "") {
      return <p className="no-instructions">No instructions available.</p>;
    }

    // Split by various line breaks and filter empty lines
    const lines = instructions
      .split(/\r?\n|\r/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // Check if instructions are numbered
    const isNumbered = lines.some((line) =>
      /^\s*(\d+[.)]|\d+\s*[-.])\s+/.test(line)
    );
    if (isNumbered) {
      return (
        <ol className="instructions-list">
          {lines.map((line, idx) => (
            <li key={idx} className="instruction-item">
              {line.replace(/^\s*\d+[.)]\s*|\d+\s*[-.]/, "").trim()}
            </li>
          ))}
        </ol>
      );
    } else {
      // For paragraph-style instructions, split by periods if it's one long sentence
      if (lines.length === 1 && lines[0].includes(". ")) {
        const sentences = lines[0]
          .split(". ")
          .map((sentence) => sentence.trim())
          .filter((sentence) => sentence.length > 0);
        return (
          <div className="instructions-paragraphs">
            {sentences.map((sentence, idx) => (
              <p key={idx} className="instruction-paragraph">
                {sentence.endsWith(".") ? sentence : sentence + "."}
              </p>
            ))}
          </div>
        );
      } else {
        return (
          <div className="instructions-paragraphs">
            {lines.map((line, idx) => (
              <p key={idx} className="instruction-paragraph">
                {line}
              </p>
            ))}
          </div>
        );
      }
    }
  }

  const isUserRecipe = Boolean(recipe.id && !recipe.idMeal);
  const recipeName = recipe.strMeal || recipe.name || "Untitled Recipe";
  const recipeImage =
    recipe.strMealThumb || recipe.image || "/defaultImage.jpg";
  const recipeInstructions = recipe.strInstructions || recipe.steps || "";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="modal-header">
          <img
            src={recipeImage}
            alt={recipeName}
            className="modal-recipe-image"
            onError={(e) => {
              e.target.src = "/defaultImage.jpg";
            }}
          />

          <div className="modal-header-content">
            <h2 className="modal-recipe-title">{recipeName}</h2>

            {(recipe.strArea || recipe.strCategory) && (
              <div className="recipe-meta">
                {recipe.strArea && (
                  <span className="meta-tag area-tag">
                    <i className="bi bi-geo-alt-fill"></i>
                    {recipe.strArea}
                  </span>
                )}
                {recipe.strCategory && (
                  <span className="meta-tag category-tag">
                    <i className="bi bi-tag-fill"></i>
                    {recipe.strCategory}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="modal-body">
          <div className="recipe-section ingredients-section">
            <h3 className="section-title">Ingredients</h3>
            <ul className="ingredients-list">
              {getIngredientsList(recipe).map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-bullet">•</span>
                  {ingredient}
                </li>
              ))}
            </ul>

            <div className="recipe-section instructions-section">
              <h3 className="section-title">Instructions</h3>
              <div className="instructions-content">
                {renderInstructions(recipeInstructions)}
              </div>
            </div>

            {isUserRecipe && (
              <div className="modal-footer">
                <button
                  className="btn btn-danger delete-btn"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this recipe? This action cannot be undone."
                      )
                    ) {
                      onDelete(recipe.id);
                      onClose();
                    }
                  }}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;
