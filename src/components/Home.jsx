import { useCallback, useEffect, useState } from "react";
import "./Home.css";
import RecipeModal from "./RecipeModal";
import FeaturedRecipes from "./FeaturedRecipes";
import UserRecipes from "./UserRecipes";

function Home({ dataChanged }) {
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
        const requests = Array.from({ length: 6 }, () =>
          fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
            (res) => res.json()
          )
        );
        const results = await Promise.allSettled(requests);
        const meals = results
          .filter((res) => res.status === "fulfilled")
          .map((res) => res.value.meals?.[0])
          .filter(Boolean);
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

  // Load saved recipes from localStorage
  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setUserRecipe(recipes);
  }, [dataChanged]);

  // Handle recipe delete
  const handleDeleteRecipe = useCallback(
    (recipeId) => {
      const updatedRecipe = userRecipe.filter(
        (recipe) => recipe.id !== recipeId
      );
      setUserRecipe(updatedRecipe);
      localStorage.setItem("recipes", JSON.stringify(updatedRecipe));
    },
    [userRecipe]
  );

  return (
    <div className="container">
      <FeaturedRecipes
        recipes={featuredRecipes}
        loading={loading}
        error={error}
        onSelect={setSelectedRecipe}
      />
      <UserRecipes
        recipes={userRecipe}
        onSelect={setSelectedRecipe}
        onDelete={handleDeleteRecipe}
      />
      {selectedRecipe && (
        <RecipeModal
          key={`modal-${selectedRecipe.id || selectedRecipe.idMeal}`}
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onDelete={() => handleDeleteRecipe(selectedRecipe.id)}
        />
      )}
    </div>
  );
}
export default Home;
