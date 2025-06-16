import { useState } from "react";
import "./AddRecipe.css";

function AddRecipe({ onRecipeAdded }) {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    steps: "",
    image: "",
    category: "",
    area: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!recipe.name.trim()) newErrors.name = "Recipe name is required";
    if (!recipe.ingredients.trim())
      newErrors.ingredients = "Ingredients are required";
    if (!recipe.steps.trim())
      newErrors.steps = "Preparation steps are required";
    if (recipe.image && !isValidUrl(recipe.image))
      newErrors.image = "Invalid URL";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (isSuccess) setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newRecipe = {
      ...recipe,
      name: recipe.name.trim(),
      ingredients: recipe.ingredients.trim(),
      steps: recipe.steps.trim(),
      image: recipe.image.trim(),
      category: recipe.category.trim(),
      area: recipe.area.trim(),
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    const stored = JSON.parse(localStorage.getItem("recipes")) || [];
    localStorage.setItem("recipes", JSON.stringify([...stored, newRecipe]));
    setIsSuccess(true);

    if (typeof onRecipeAdded === "function") {
      onRecipeAdded();
    }

    setRecipe({
      name: "",
      ingredients: "",
      steps: "",
      image: "",
      category: "",
      area: "",
    });
    setIsSubmitting(false);

    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="container">
      <div className="add-recipe-container fade-in">
        <div className="form-card">
          <h2 className="form-title">Add a New Recipe</h2>
          <p className="form-subtitle">
            Share your culinary creation with the community
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {/* Recipe Name */}
              <label htmlFor="name" className="form-label">
                Recipe Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={recipe.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? "error" : ""}`}
                placeholder="Enter a delicious recipe name"
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            {/* Ingredients */}
            <div className="form-group">
              <label htmlFor="ingredients" className="form-label">
                Ingredients*
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={recipe.ingredients}
                onChange={handleChange}
                className={`form-textarea ${errors.ingredients ? "error" : ""}`}
                placeholder="List ingredients, one per line&#10;e.g., 2 cups flour&#10;1 tsp salt&#10;3 eggs"
              />
              {errors.ingredients && (
                <span className="error-message">{errors.ingredients}</span>
              )}
            </div>

            {/* Steps */}
            <div className="form-group">
              <label htmlFor="steps" className="form-label">
                Preparation Steps*
              </label>
              <textarea
                id="steps"
                name="steps"
                value={recipe.steps}
                onChange={handleChange}
                className={`form-textarea ${errors.steps ? "error" : ""}`}
                placeholder="Describe the cooking steps in detail..."
              />
              {errors.steps && (
                <span className="error-message">{errors.steps}</span>
              )}
            </div>

            <div className="form-row">
              {/* Category */}
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  value={recipe.category}
                  onChange={handleChange}
                  className={`form-input ${errors.category ? "error" : ""}`}
                  placeholder="e.g., Dessert, Main Course"
                />
                {errors.category && (
                  <span className="error-message">{errors.category}</span>
                )}
              </div>

              {/* Area / Cuisine */}
              <div className="form-group">
                <label htmlFor="area" className="form-label">
                  Area / Cuisine
                </label>
                <input
                  id="area"
                  name="area"
                  value={recipe.area}
                  onChange={handleChange}
                  className={`form-input ${errors.area ? "error" : ""}`}
                  placeholder="e.g., Italian, Indian"
                />
                {errors.area && (
                  <span className="error-message">{errors.area}</span>
                )}
              </div>
            </div>

            {/* Image URL */}
            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Image URL (Optional)
              </label>
              <input
                id="image"
                type="url"
                name="image"
                value={recipe.image}
                onChange={handleChange}
                className={`form-input ${errors.image ? "error" : ""}`}
                placeholder="https://example.com/recipe-image.jpg"
              />
              {errors.image && (
                <span className="error-message">{errors.image}</span>
              )}
            </div>

            {/* Success message */}
            {isSuccess && (
              <div className="success-alert" aria-live="polite">
                Recipe added successfully!
              </div>
            )}

            {/* Submit button */}
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Adding Recipe...
                  </>
                ) : (
                  <> Add Recipe </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddRecipe;
