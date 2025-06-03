import { useState } from "react";
import "./AddRecipe.css";

function AddRecipe({ onRecipeAdded }) {
  console.log("AddRecipe component rendered");

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    steps: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

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

  const [issubmitting, setIssubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
    // issubmitting(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIssubmitting(true);
    const newRecipe = {
      ...recipe,
      name: recipe.name.trim(),
      ingredients: recipe.ingredients.trim(),
      steps: recipe.steps.trim(),
      image: recipe.image.trim(),
      id: Date.now(),
    };

    const stored = JSON.parse(localStorage.getItem("recipes")) || [];
    localStorage.setItem("recipes", JSON.stringify([...stored, newRecipe]));
    alert("Recipe Added!");

    if (typeof onRecipeAdded === "function") {
      onRecipeAdded();
    }

    setRecipe({ name: "", ingredients: "", steps: "", image: "" });
    setIssubmitting(false);
  };

  return (
    <div className="add-recipe-form">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Recipe Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          className={errors.name ? "error" : ""}
          required
        />
        {errors.name && <span className="error-message">{errors.name}</span>}

        <label htmlFor="ingredients">Ingredients </label>
        <textarea
          id="ingredients"
          name="ingredients"
          placeholder="List ingredients, one per line"
          value={recipe.ingredients}
          onChange={handleChange}
          className={errors.ingredients ? "error" : ""}
          required
        />
        {errors.ingredients && (
          <span className="error-message">{errors.ingredients}</span>
        )}

        <label htmlFor="steps">Preparation Steps </label>
        <textarea
          id="steps"
          name="steps"
          value={recipe.steps}
          placeholder="Describe the steps"
          onChange={handleChange}
          className={errors.steps ? "error" : ""}
          required
        />
        {errors.steps && <span className="error-message">{errors.steps}</span>}

        <label htmlFor="image">Image </label>
        <input
          id="image"
          type="url"
          name="image"
          value={recipe.image}
          onChange={handleChange}
          className={errors.image ? "error" : ""}
        />
        {errors.image && <span className="error-message">{errors.image}</span>}

        <button type="submit" disabled={issubmitting}>
          {issubmitting ? "Adding Recipe..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
}
export default AddRecipe;
