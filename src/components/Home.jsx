import { useEffect, useState } from "react";

function Home() {
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    const savedRecipe = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipe(savedRecipe);
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
          {recipe.length > 0 ? (
            recipe.map((r) => (
              <article key={r.id} className="recipe-card">
                <img
                  src={r.image || "https://via.placeholder.com/150"}
                  alt={r.name}
                />
                <h4>{r.name}</h4>
                <p>
                  {r.ingredients.length > 50
                    ? `${r.ingredients.slice(0, 50)}...`
                    : r.ingredients}
                </p>
              </article>
            ))
          ) : (
            <p>No recipes found. Add some!</p>
          )}
        </div>
      </section>
    </>
  );
}
export default Home;
