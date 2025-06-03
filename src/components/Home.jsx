import { useEffect, useState } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Home() {
  const [userRecipe, setUserRecipe] = useState([]);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  //Fetch Recipe from API
  useEffect(() => {
    const featuredRecipes = async () => {
      try {
        const promise = Array.from({ length: 5 }, () =>
          fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
            (res) => res.json()
          )
        );
        const result = await Promise.all(promise);
        const meals = result.map((result) => result.meals[0]);
        setFeaturedRecipes(meals);
      } catch (error) {
        console.error("Error fetching featured recipes", error);
      } finally {
        setLoading(false);
      }
    };
    featuredRecipes();
  }, []);

  // Load user recipes from memory state
  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setUserRecipe(recipes);
  }, []);

  return (
    <>
      <section className="welcome-section">
        <h2>Welcome to RecipeRipple</h2>
        <p>
          Discover, add, and share delicious recipes that ripple through the
          community.
        </p>
      </section>

      <section className="recipes-preview">
        <h3>Featured Recipes</h3>
        <div className="recipe-cards">
          {loading ? (
            <p>Loading featured recipes...</p>
          ) : featuredRecipes.length > 0 ? (
            featuredRecipes.map((meal) => (
              <article key={meal.idMeal} className="recipe-card">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h4>{meal.strMeal}</h4>
                <p>
                  {meal.strInstructions?.slice(0, 100) ||
                    "No instructions available"}
                  ...
                </p>
                <div className="recipe-meta">
                  <span className="tag">
                    <i className="bi bi-tag-fill"></i> {meal.strCategory}
                  </span>
                  <span className="tag">
                    <i className="bi bi-geo-alt-fill"></i> {meal.strArea}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <p>No featured recipes available at the moment.</p>
          )}
        </div>
      </section>

      <section className="recipes-preview">
        <h3>Your Saved Recipes</h3>
        <div className="recipe-cards">
          {userRecipe.length > 0 ? (
            userRecipe.map((r) => (
              <article key={r.id} className="recipe-card">
                <img
                  src={
                    r.image || "https://via.placeholder.com/300x200?text=Recipe"
                  }
                  alt={r.name}
                />
                <h4>{r.name}</h4>
                <p>
                  {r.ingredients
                    ? r.ingredients.length > 100
                      ? `${r.ingredients.slice(0, 100)}...`
                      : r.ingredients
                    : "No ingredients provided"}
                </p>
                <div className="recipe-actions">
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      const updatedRecipes = userRecipe.filter(
                        (r) => r.id !== r.id
                      );
                      setUserRecipe(updatedRecipes);
                      sessionStorage.setItem(
                        "recipes",
                        JSON.stringify(updatedRecipes)
                      );
                    }}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p>No recipes found. Add some using the "Add Recipe" page!</p>
          )}
        </div>
      </section>
    </>
  );
}
export default Home;
