import { useEffect, useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import RecipeModal from "./RecipeModal";

function Home({ refreshTrigger }) {
  const DEFAULT_IMAGE = "/defaultImage.jpg";
  const [userRecipe, setUserRecipe] = useState([]);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  //Fetch Recipe from API
  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        setLoading(true);
        const promise = Array.from({ length: 6 }, () =>
          fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
            (res) => res.json()
          )
        );
        const result = await Promise.all(promise);
        const meals = result.map((result) => result.meals[0]);
        setFeaturedRecipes(meals);
      } catch (error) {
        console.error("Error fetching featured recipes", error);
        setError("Failed to load featured recipes");
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedRecipes();
  }, []);

  // Load user recipes from memory state
  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setUserRecipe(recipes);
  }, [refreshTrigger]);

  const handleDeleteRecipe = (recipeId) => {
    const updatedRecipe = userRecipe.filter((recipe) => recipe.id !== recipeId);
    setUserRecipe(updatedRecipe);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipe));
  };

  return (
    <>
      <div className="container">
        <section className="recipes-section fade-in">
          <h2 className="section-title">Featured Recipes</h2>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <span style={{ marginLeft: "1rem" }}>
                Loading featured recipes...
              </span>
            </div>
          ) : error ? (
            <div className="error-container">
              <div className="empty-state-icon"> Error </div>
              <p>{error}</p>
            </div>
          ) : featuredRecipes.length > 0 ? (
            <div className="recipe-grid">
              {featuredRecipes.map((meal) => (
                <article
                  key={`api-${meal.idMeal}`}
                  className="recipe-card"
                  onClick={() => setSelectedRecipe(meal)}
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="recipe-image"
                  />
                  <div className="recipe-content">
                    <h3 className="recipe-title">{meal.strMeal}</h3>
                    <p className="recipe-description">
                      {meal.strInstructions?.slice(0, 120) ||
                        "No instructions available"}
                      ...
                    </p>
                    <div className="recipe-meta">
                      <span className="tag">
                        <i className="bi bi-geo-alt-fill"></i> {meal.strArea}
                      </span>
                      <span className="tag">
                        <i className="bi bi-tag-fill"></i> {meal.strCategory}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">Something</div>
              <p>No featured recipes available at the moment.</p>
            </div>
          )}
        </section>

        <section className="recipes-section fade-in">
          <h2 className="section-title">Your Saved Recipes</h2>
          {userRecipe.length > 0 ? (
            <div className="recipe-grid">
              {userRecipe.map((r) => (
                <article
                  key={`user-${r.id}`}
                  className="recipe-card"
                  onClick={() => setSelectedRecipe(r)}
                >
                  <img
                    src={r.image?.trim() ? r.image : DEFAULT_IMAGE}
                    alt={r.name}
                    className="recipe-image"
                  />
                  <div className="recipe-content">
                    <h4 className="recipe-title">{r.name}</h4>
                    <p className="recipe-description">
                      {r.ingredients
                        ? r.ingredients.length > 100
                          ? `${r.ingredients.slice(0, 100)}...`
                          : r.ingredients
                        : "No ingredients provided"}
                    </p>
                  </div>
                </article>
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
      </div>
      {selectedRecipe && (
        <RecipeModal
          key={`modal-${selectedRecipe.id || selectedRecipe.idMeal}`}
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onDelete={() => handleDeleteRecipe(selectedRecipe.id)}
        />
      )}
    </>
  );
}
export default Home;
