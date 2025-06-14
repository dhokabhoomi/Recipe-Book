import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Search.css";
import RecipeCard from "./RecipeCard";

// Lazy-load RecipeModal
const RecipeModal = lazy(() => import("./RecipeModal"));

function Search() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState("");
  const cache = useRef(new Map());

  // Popular search suggestions
  const popularSuggestions = useMemo(
    () => ["Pasta", "Vegetarian", "Breakfast", "Cake", "Chicken"],
    []
  );

  // Executes search via API with query caching and error handling
  const runSearch = useCallback(async () => {
    const trimmedQuery = query.trim().toLowerCase();
    if (trimmedQuery.length <= 2) {
      setSearchResult([]);
      setHasSearched(false);
      setError("");
      return;
    }
    // setLoading(true);
    if (cache.current.has(trimmedQuery)) {
      setSearchResult(cache.current.get(trimmedQuery));
      setHasSearched(true);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query.trim()}`
      );
      const data = await response.json();
      const results = data.meals || [];
      cache.current.set(trimmedQuery, results);
      setSearchResult(results);
      setHasSearched(true);
    } catch (err) {
      console.error("Search Error", err);
      setError("Something went wrong. Please try again.");
      setSearchResult([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  // Debounce input
  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length <= 2) {
      setSearchResult([]);
      setHasSearched(false);
      setError("");
      return;
    }

    const handler = setTimeout(() => {
      runSearch();
    }, 500);

    return () => clearTimeout(handler);
  }, [query, runSearch]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    if (input === query) return;
    setQuery(input);
    setQuery(input);
  };

  const handleSuggestionsClick = (suggestion) => {
    setQuery(suggestion);
  };

  const clearSearch = () => {
    setQuery("");
    setSearchResult([]);
    setHasSearched(false);
    setError("");
  };

  return (
    <div className="container search-page-wrapper">
      <div className="search-container fade-in">
        <div className="search-header">
          <h2 className="search-title">Search Recipes</h2>
          <p className="search-subtitle">
            Discover delicious recipes from around the world
          </p>
        </div>
        <div className="search-form">
          <i className="bi bi-search search-icon"></i>
          <input
            type="search"
            className="search-input"
            placeholder="Search for recipes... (e.g., pasta, chicken, dessert)"
            value={query}
            onChange={handleInputChange}
            aria-label="Search recipes"
          />
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span style={{ marginLeft: "1rem" }}>Searching recipes...</span>
          </div>
        )}

        {error && (
          <div className="no-result error-message">
            <p>{error}</p>
          </div>
        )}

        {hasSearched && !loading && !error && searchResult.length > 0 && (
          <div className="search-result">
            <div className="results-header">
              <span className="result-count">
                Found {searchResult.length} recipe
                {searchResult.length !== 1 ? "s" : ""} for "{query}"
              </span>
              <button
                className="clear-search"
                onClick={() => {
                  clearSearch();
                }}
              >
                Clear Search
              </button>
            </div>
            <div className="recipe-grid">
              {searchResult.map((meal) => (
                <RecipeCard
                  key={meal.idMeal}
                  recipe={meal}
                  onSelect={() => setSelectedRecipe(meal)}
                  isUserRecipe={false}
                />
              ))}
            </div>
          </div>
        )}

        {hasSearched && !loading && !error && searchResult.length === 0 && (
          <>
            <div className="no-result">
              <p>No recipes found for "{query}"</p>
              <p>
                Try searching for something else or check the suggestions below.
              </p>
            </div>
            <div className="search-suggestions">
              <h3 className="suggestions-title">Popular Searches</h3>
              <div className="suggestion-tags">
                {popularSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    className="suggestion-tag"
                    onClick={() => handleSuggestionsClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {!hasSearched && !loading && !error && (
          <div className="search-suggestions">
            <h3 className="suggestions-title">Popular Searches</h3>
            <div className="suggestion-tags">
              {popularSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  className="suggestion-tag"
                  onClick={() => handleSuggestionsClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedRecipe && (
        <Suspense fallback={<div className="modal-fallback">Loading...</div>}>
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            onDelete={() => {}}
          />
        </Suspense>
      )}
    </div>
  );
}
export default Search;
