import { useState } from "react";
import "./Search.css";

function Search() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim().length > 2) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
        );
        const data = await response.json();
        setSearchResult(data.meals || []);
        setHasSearched(true);
      } catch (error) {
        console.log("Search Error.", error);
        setSearchResult([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResult([]);
      setHasSearched(false);
    }
  };
  return (
    <div className="container">
      <div className="search-container fade-in">
        <div className="search-header">
          <h2 className="search-title">Search Recipes</h2>
          <p className="search-subtitle">
            Discover delicious recipes from around the world
          </p>
        </div>
        <div className="seacrh-form">
          <input
            type="search"
            className="search-input"
            placeholder="Search for recipes... (e.g., pasta, chicken, dessert)"
            value={query}
            onChange={handleSearch}
          />
        </div>
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span style={{ marginLeft: "1rem" }}>Searching recipes...</span>
          </div>
        )}
        {hasSearched && !loading && (
          <div className="search-result">
            {searchResult.length > 0 ? (
              <>
                <div className="results-header">
                  <span className="result-count">
                    Found {searchResult.length} recipe
                    {searchResult.length !== 1 ? "s" : ""} for "{query}"
                  </span>
                  <button
                    className="clear-search"
                    onClick={() => {
                      setQuery("");
                      setSearchResult([]);
                      setHasSearched(false);
                    }}
                  >
                    Clear Search
                  </button>
                </div>
                <div className="recipe-grid">
                  {searchResult.map((meal) => (
                    <article key={meal.idMeal} className="recipe-card">
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
                            <i className="bi bi-geo-alt-fill"></i>{" "}
                            {meal.strArea}
                          </span>
                          <span className="tag">
                            <i className="bi bi-tag-fill"></i>{" "}
                            {meal.strCategory}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-result">
                <p>No recipes found for "{query}"</p>
                <p>
                  Try searching for something else or check the suggestions
                  below.
                </p>
              </div>
            )}
          </div>
        )}
        {!hasSearched && !loading && (
          <div className="search-suggestions">
            <h3 className="suggestions-title">Popular Searches</h3>
            <div className="suggestion-tags">
              {["Pasta", "Vegetarian", "Breakfast", "Cake", "Chicken"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    className="suggestion-tag"
                    onClick={() => {
                      setQuery(suggestion);
                      handleSearch({ target: { value: suggestion } });
                    }}
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Search;
