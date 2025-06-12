import { NavLink } from "react-router-dom";
import RecipeCard from "./RecipeCard";
const DEFAULT_IMAGE = "/defaultImage.jpg";

const SavedRecipes = ({ recipes, onSelect }) => {
  return (
    <section className="recipes-section fade-in">
      <h2 className="section-title">Your Saved Recipes</h2>
      {recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((r) => (
            <RecipeCard
              key={`user-${r.id}`}
              recipe={{ ...r, image: r.image?.trim() || DEFAULT_IMAGE }}
              onSelect={onSelect}
              isUserRecipe
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No recipes found. Add some using the "Add Recipe" page!</p>
          <NavLink to="/AddRecipe" className="btn btn-primary">
            Add Your First Recipe
          </NavLink>
        </div>
      )}
    </section>
  );
};

export default SavedRecipes;
