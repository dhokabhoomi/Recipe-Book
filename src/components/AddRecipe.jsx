import { useState } from "react";

function AddRecipe() {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    steps: "",
    image: "",
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      ...recipe,
      id: Date.now(),
    };
    const stored = JSON.parse(localStorage.getItem("recipes")) || [];
    localStorage.setItem("recipes", JSON.stringify([...stored, newRecipe]));
    alert("Recipe Added!");
    setRecipe({ name: "", ingredients: "", steps: "", image: "" });
    // console.log("Recipe submitted", recipe);
  };

  return (
    <div className="add-reccipe-form">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>Recipe Name</label>
        <input
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          required
        />
        <label>Ingredients </label>
        <textarea
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          placeholder="List ingredients, one per line"
          required
        />
        <label>Preparation Steps </label>
        <textarea
          name="steps"
          value={recipe.steps}
          onChange={handleChange}
          placeholder="Describe the steps"
          required
        />
        <label>Image </label>
        <input
          type="url"
          name="image"
          value={recipe.image}
          onChange={handleChange}
        />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}
export default AddRecipe;
